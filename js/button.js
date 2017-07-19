import * as graph from "./graph.js";

export default function addButtons()
{
  const resetView = document.createElement("button");
  document.getElementById("buttons").appendChild(resetView);
  resetView.innerText = "Reset View";
  resetView.addEventListener("click",graph.resetStyle);
  const history = document.createElement("button");
  document.getElementById("buttons").appendChild(history);
  resetView.innerText = "Reset View";
  resetView.addEventListener("click",graph.resetStyle);
}

/*
"Grid","graph.layout('grid')"/>
"Force (Slow)","graph.layout('cola')"/>
"Spring (Slow)","graph.layout('cose')"/>
"Breadthfirst (Slow)","graph.layout('breadthfirst')"/>-->



"Eval","window.open('http://www.snik.eu/evaluation','_blank')"/>
"Remove","graph.remove(graph.cy.$('node:selected'));"/>
"Restore","graph.restore()"/>
"Load","load.loadSparql()"/>
"Set Source","graph.setSource(selectedNode)" />
"Set Target","graph.setTarget(selectedNode)" />
"Center Source","graph.cy.center(graph.graph.pathSource)" id="centersource"
"Center Target","graph.cy.center(graph.pathTarget);" id="centertarget"
"Shortest Path","graph.showPath(graph.pathSource,graph.pathTarget)" id="shortestpath"
"Spider Worm","graph.showWorm(graph.pathSource,graph.pathTarget)" id="spiderworm"
"Starpath","graph.showStarPath(graph.pathSource,graph.pathTarget)" id="starpath"
"Double Star","graph.showDoubleStar(graph.pathSource,graph.pathTarget)" id="doublestar"
			</form>
*/
