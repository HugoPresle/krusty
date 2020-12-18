function imgChange()
{
    var newImage= document.getElementById("newImg").value;
    console.log(newImage);
    document.getElementById("imgKrusty").path=newImage;
}

function selectedType(selected) 
{
    var type= selected.value;
    
    if (type=="cercle")
    {
        document.getElementById("cercleDiv").style.visibility="visible";
        document.getElementById("polygonesDiv").style.visibility="hidden";
        document.getElementById("carreDiv").style.visibility="hidden";
    }
    else if(type=="carre")
    {
        document.getElementById("carreDiv").style.visibility="visible";
        document.getElementById("cercleDiv").style.visibility="hidden";
        document.getElementById("polygonesDiv").style.visibility="hidden";
    }
    else if(type=="polygones")
    {
        document.getElementById("polygonesDiv").style.visibility="visible";
        document.getElementById("carreDiv").style.visibility="hidden";
        document.getElementById("cercleDiv").style.visibility="hidden";
    }
    
}


/*************************************************/
function objectMap(cheminImage,nomMap,tabObjectArea)
{
    this.cheminImage=cheminImage;
    this.nomMap=nomMap;
    this.tabObjectArea=tabObjectArea;

}
function objectAreaCarre(idArea,typeAire,ensemblePoint)
{
    this.idArea=idArea;
    this.typeAire=typeAire;
    this.ensemblePoint=ensemblePoint; //type ObjectPoint

}
function objectPoint(x,y)
{
    this.x=x;
    this.y=y;

}
function addMap(point1,point2) 
{

    //crée l'element area
    var newArea=document.createElement("area");
    newArea.shape="rect";
    newArea.href="#";
    newArea.coords=point1.x+","+point1.y+","+point2.x+","+point2.y;

    //affiche l'element area sur la map
    document.getElementById("krusty").insertAdjacentElement("beforeend",newArea);

    
}

var objTab=[];
function createObjCarre() 
{
    id= document.getElementById("id").value
    type= document.getElementById("type").value
    id= document.getElementById("id").value

    var point1 = new objectPoint(document.getElementById("x1").value,document.getElementById("y1").value);
    var point2 = new objectPoint(document.getElementById("x2").value,document.getElementById("y2").value);
    point=[point1,point2];

    var obj= new objectAreaCarre(id,type,point);
    this.objTab.push(obj);
    addMap(point1,point2);
    //TEST
    console.log(this.objTab);  
}

