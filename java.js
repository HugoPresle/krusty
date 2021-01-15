/********************* CSS function *********************/
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
        window.alert("Ne peut pas être utilisé pour le moment");
        document.getElementById("polygonesDiv").style.visibility="visible";
        document.getElementById("carreDiv").style.visibility="hidden";
        document.getElementById("cercleDiv").style.visibility="hidden";
    }
    
}

/********************* PUBLIC VAR *********************/

var objTab=[];
var id=0;

/********************* CLASS *********************/
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

/********************* FUNCTION *********************/

function addCarre(point1,point2,id) 
{

    //crée l'element area
    var newArea=document.createElement("area");
    newArea.id=id+"_area";
    newArea.shape="rect";
    newArea.coords=point1.x+","+point1.y+","+point2.x+","+point2.y;
    
    //crée une div 
    var newdiv=document.createElement("div");
    newdiv.id=id;
    newdiv.style.top=point1.y;
    newdiv.style.left=point1.x;
    newdiv.style.width=point2.x;
    newdiv.style.height=point2.y;
    newdiv.style.border="solid blue";
    newdiv.style.position="absolute";
    newdiv.style.cursor= "pointer";

    //affiche l'element area sur la map
    document.getElementById("divbord").insertAdjacentElement("afterbegin",newdiv);
    document.getElementById("krusty").insertAdjacentElement("beforeend",newArea);

    
}

function addRond(point1,point2,rayon,id) 
{

    //crée l'element area
    var newArea=document.createElement("area");
    newArea.id=id+"_area";
    newArea.shape="circle";
    newArea.coords=point1+","+point2+","+rayon;
    
    //crée une div 
    var newdiv=document.createElement("div");
    newdiv.id=id;
    newdiv.style.top=parseInt(rayon);
    newdiv.style.left=parseInt(point1)-parseInt(rayon);
    newdiv.style.width=parseInt(point1)+parseInt(rayon);
    newdiv.style.height=parseInt(point2)+parseInt(rayon);
    newdiv.style.border="solid red";
    newdiv.style.position="absolute";
    newdiv.style.borderRadius="50%";
    newdiv.style.cursor= "pointer";

    //affiche l'element area sur la map
    document.getElementById("divbord").insertAdjacentElement("afterbegin",newdiv);
    document.getElementById("krusty").insertAdjacentElement("beforeend",newArea);

    
}
function createObj() 
{
    type= document.getElementById("type").value;
    act= document.getElementById("act").value;
    // tryCtach si ça ne marche pas 
    try 
    {
        if (type=="carre") 
        {  
            //POINT CARRE
            var point1 = new objectPoint(document.getElementById("x1").value,document.getElementById("y1").value);
            var point2 = new objectPoint(document.getElementById("x2").value,document.getElementById("y2").value);
            point=[point1,point2];
            addCarre(point1,point2,id);
        } 

        else if (type=="cercle")
        { 
            //POINT ROND
            var point1 = document.getElementById("x").value;
            var point2 = document.getElementById("y").value;
            var rayon= document.getElementById("R").value;
            addRond(point1,point2,rayon)
            point=[point1,point2,rayon,id];
        }
        else
        {
            point=[0];
        }
        
        var obj= new objectAreaCarre(id,type,point);
        id++;
        this.objTab.push(obj);
    } 
    catch (error) 
    {
       console.log(error); 
       window.alert("Un problème rencontré, veuillez ressayer.");
    }
    
    //TEST
    console.log(this.objTab);  
}

function Up() 
{
    var leng=objTab.length-1;
    var type=objTab[0].typeAire;

    // avant de suprr on recupe les ancienne coord +1

    var point1Old = new objectPoint(objTab[leng].ensemblePoint[0].x,objTab[leng].ensemblePoint[0].y);
    var point2Old = new objectPoint(objTab[leng].ensemblePoint[1].x,objTab[leng].ensemblePoint[1].y)

    //on suprime la div ainsi que l'objet + l'area puis on recrée avec les nouvels coord
    
    if (type=="carre") 
    {
        RemoveById(leng);
        var newPoint=new objectPoint(point1Old.x,parseInt(point1Old.y)-1)
        addCarre(newPoint,point2Old,leng);
        UpdateObj(newPoint,point2Old,leng,type)
        document.getElementById(leng).style.height=parseInt(document.getElementById(leng).style.height)-1;
    }
    else if (type=="cercle") 
    {
        
        window.alert("Pas encore possible de deplacer des cercles. Veuillez recréer un rectangle ou faire F5 pour deplacer à nouveau");
        // addRond()
    }
}

function Right() 
{  
    var leng=objTab.length-1;
    var type=objTab[0].typeAire;

    // avant de suprr on recupe les ancienne coord +1

    var point1Old = new objectPoint(objTab[leng].ensemblePoint[0].x,objTab[leng].ensemblePoint[0].y);
    var point2Old = new objectPoint(objTab[leng].ensemblePoint[1].x,objTab[leng].ensemblePoint[1].y)

    //on suprime la div ainsi que l'objet + l'area puis on recrée avec les nouvels coord
    
    if (type=="carre") 
    {
        RemoveById(leng);
        var newPoint=new objectPoint(parseInt(point1Old.x)+1,point1Old.y)
        addCarre(newPoint,point2Old,leng);
        UpdateObj(newPoint,point2Old,leng,type)
        document.getElementById(leng).style.height=parseInt(document.getElementById(leng).style.width)+1;
    }
    else if (type=="cercle") 
    {
        
        window.alert("Pas encore possible de deplacer des cercles. Veuillez recréer un rectangle ou faire F5 pour deplacer à nouveau");
        // addRond()
    }
}

function Left() 
{
    var leng=objTab.length-1;
    var type=objTab[0].typeAire;

    // avant de suprr on recupe les ancienne coord +1

    var point1Old = new objectPoint(objTab[leng].ensemblePoint[0].x,objTab[leng].ensemblePoint[0].y);
    var point2Old = new objectPoint(objTab[leng].ensemblePoint[1].x,objTab[leng].ensemblePoint[1].y)

    //on suprime la div ainsi que l'objet + l'area puis on recrée avec les nouvels coord
    
    if (type=="carre") 
    {
        RemoveById(leng);
        var newPoint=new objectPoint(parseInt(point1Old.x)-1,point1Old.y)
        addCarre(newPoint,point2Old,leng);
        UpdateObj(newPoint,point2Old,leng,type)
        document.getElementById(leng).style.height=parseInt(document.getElementById(leng).style.left)-1;
    }
    else if (type=="cercle") 
    {
        
        window.alert("Pas encore possible de deplacer des cercles. Veuillez recréer un rectangle ou faire F5 pour deplacer à nouveau");
        // addRond()
    }
}

function Down() 
{
    var leng=objTab.length-1;
    var type=objTab[0].typeAire;

    // avant de suprr on recupe les ancienne coord +1

    var point1Old = new objectPoint(objTab[leng].ensemblePoint[0].x,objTab[leng].ensemblePoint[0].y);
    var point2Old = new objectPoint(objTab[leng].ensemblePoint[1].x,objTab[leng].ensemblePoint[1].y)

    //on suprime la div ainsi que l'objet + l'area puis on recrée avec les nouvels coord
    
    if (type=="carre") 
    {
        RemoveById(leng);
        var newPoint=new objectPoint(point1Old.x,parseInt(point1Old.y)+1)
        addCarre(newPoint,point2Old,leng);
        UpdateObj(newPoint,point2Old,leng,type)
        document.getElementById(leng).style.height=parseInt(document.getElementById(leng).style.height)+1;
    }
    else if (type=="cercle") 
    {
        
        window.alert("Pas encore possible de deplacer des cercles. Veuillez recréer un rectangle ou faire F5 pour deplacer à nouveau");
        // addRond()
    }
}

function RemoveById(id) 
{
    //remove de la div
    document.getElementById(id).remove();

    //remove de l'area
    document.getElementById(id+"_area").remove();

    //et l'objet du tab
    objTab.splice(id,1);
}

function UpdateObj(P1,P2,id,type) 
{
    point=[P1,P2];
    var obj= new objectAreaCarre(id,type,point);
    this.objTab.push(obj);
}
