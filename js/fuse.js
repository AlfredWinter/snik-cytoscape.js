/**
Fuzzy search with fuse.js.
@module */
import * as sparql from "./sparql.js";
import config from "./config.js";

let index = null;

const options =
{
  shouldSort: true,
  tokenize: true,
  threshold: 0.25,
  maxPatternLength: 40,
  minMatchCharLength: 3,
  matchAllTokens: true,
  location: 0,
  distance: 100,
  id: "uri",
  keys:
  [
    {name:"l", weight: 0.7},
    {name:"def", weight: 0.3},
  ],
};

/** Create fulltext index from SPARQL endpoint. */
export async function createIndex()
{
  log.info("Create Fuse Search Index");
  const froms = config.allSubOntologies.map(sub=>`from <http://www.snik.eu/ontology/${sub}>`).reduce((a,b)=>a+"\n"+b);
  const sparqlQuery = `select
  ?c as ?uri
  group_concat(distinct(str(?l));separator="|") as ?l
  group_concat(distinct(str(?al));separator="|") as ?al
  group_concat(distinct(str(?def));separator="|") as ?def
  ${froms}
  {
    ?c a owl:Class.
    OPTIONAL {?c rdfs:label ?l.}
    OPTIONAL {?c skos:altLabel ?al.}
    OPTIONAL {?c skos:definition ?def.}
  }`;
  const bindings = await sparql.select(sparqlQuery);
  const items = [];
  const i=0;
  for(const b of bindings)
  {
    const item = {};
    items.push(item);
    const suffix = b.uri.value.replace(/.*\//,"");
    item.uri = b.uri.value;
    item.l = [...b.l.value.split('|'),suffix];
    if(b.al.value) {item.l = [...item.l,...b.al.value.split('|')];}
    if(b.def.value) {item.def = b.def.value;}
  }
  index = new Fuse(items,options);
  return items; // for testing
}

/** Searches the Fuse index for classes with a similar label.
@return {Promise<Set>} A promise with a set of class URIs.
*/
export async function search(userQuery)
{
  if(!index) {await createIndex();}
  const result = index.search(userQuery);
  return result;
}
