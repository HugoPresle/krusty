/********************* CSS function *********************/
function imgChange()
{
    var newImage= document.getElementById("newImg").files[0].name;
    console.log(newImage);
    document.getElementById("imgKrusty").src=newImage;
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
var idArrowUse=null;

/********************* CLASS *********************/
function objectMap(cheminImage,nomMap,tabObjectArea)
{
    this.cheminImage=cheminImage;
    this.nomMap=nomMap;
    this.tabObjectArea=tabObjectArea;

}
function objectArea(idArea,typeAire,ensemblePoint)
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
            addRond(point1,point2,rayon,id)
            point=[point1,point2,rayon,id];
        }
        else
        {
            point=[0];
        }
        
        var obj= new objectArea(id,type,point);
        id++;
        CreateTable(obj);
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

function Up(id) 
{
    var type=objTab[id].typeAire;

    if (type=="carre") 
    {
        // avant de suprr on recupe les ancienne coord +1
        var point1Old = new objectPoint(objTab[id].ensemblePoint[0].x,objTab[id].ensemblePoint[0].y);
        var point2Old = new objectPoint(objTab[id].ensemblePoint[1].x,objTab[id].ensemblePoint[1].y);

        //on suprime la div ainsi que l'objet + l'area puis on recrée avec les nouvels coord

        RemoveById(id);
        var newPoint=new objectPoint(point1Old.x,parseInt(point1Old.y)-1)
        addCarre(newPoint,point2Old,id);
        UpdateObj(newPoint,point2Old,id,type)
        document.getElementById(id).style.height=parseInt(document.getElementById(id).style.height)-1;
    }
    else if (type=="cercle") 
    {
        
        window.alert("Pas encore possible de deplacer des cercles. Veuillez recréer un rectangle ou faire F5 pour deplacer à nouveau");
        
        // // avant de suprr on recupe les ancienne coord +1
        // var pointOldx = objTab[id].ensemblePoint[0];
        // var pointOldy = objTab[id].ensemblePoint[1];
        // var rayonOld = objTab[id].ensemblePoint[2];
        

        // RemoveById(id);
        // var newPoint=parseInt(pointOldy)-1;
        // addRond(pointOldx,newPoint,rayonOld,id);
        // UpdateObj(pointOldx,newPoint,id,type)
        // document.getElementById(id).style.height=parseInt(document.getElementById(id).style.height)-1;
    }
}

function Right(id) 
{  
    var type=objTab[0].typeAire;

    // avant de suprr on recupe les ancienne coord +1

    var point1Old = new objectPoint(objTab[id].ensemblePoint[0].x,objTab[id].ensemblePoint[0].y);
    var point2Old = new objectPoint(objTab[id].ensemblePoint[1].x,objTab[id].ensemblePoint[1].y)

    //on suprime la div ainsi que l'objet + l'area puis on recrée avec les nouvels coord
    
    if (type=="carre") 
    {
        RemoveById(id);
        var newPoint=new objectPoint(parseInt(point1Old.x)+1,point1Old.y)
        addCarre(newPoint,point2Old,id);
        UpdateObj(newPoint,point2Old,id,type)
        document.getElementById(id).style.height=parseInt(document.getElementById(id).style.width)+1;
    }
    else if (type=="cercle") 
    {
        
        window.alert("Pas encore possible de deplacer des cercles. Veuillez recréer un rectangle ou faire F5 pour deplacer à nouveau");
        // addRond()
    }
}

function Left(id) 
{
    var type=objTab[0].typeAire;

    // avant de suprr on recupe les ancienne coord +1

    var point1Old = new objectPoint(objTab[id].ensemblePoint[0].x,objTab[id].ensemblePoint[0].y);
    var point2Old = new objectPoint(objTab[id].ensemblePoint[1].x,objTab[id].ensemblePoint[1].y)

    //on suprime la div ainsi que l'objet + l'area puis on recrée avec les nouvels coord
    
    if (type=="carre") 
    {
        RemoveById(id);
        var newPoint=new objectPoint(parseInt(point1Old.x)-1,point1Old.y)
        addCarre(newPoint,point2Old,id);
        UpdateObj(newPoint,point2Old,id,type)
        document.getElementById(id).style.height=parseInt(document.getElementById(id).style.left)-1;
    }
    else if (type=="cercle") 
    {
        
        window.alert("Pas encore possible de deplacer des cercles. Veuillez recréer un rectangle ou faire F5 pour deplacer à nouveau");
        // addRond()
    }
}

function Down(id) 
{
    var type=objTab[0].typeAire;

    // avant de suprr on recupe les ancienne coord +1

    var point1Old = new objectPoint(objTab[id].ensemblePoint[0].x,objTab[id].ensemblePoint[0].y);
    var point2Old = new objectPoint(objTab[id].ensemblePoint[1].x,objTab[id].ensemblePoint[1].y)

    //on suprime la div ainsi que l'objet + l'area puis on recrée avec les nouvels coord
    
    if (type=="carre") 
    {
        RemoveById(id);
        var newPoint=new objectPoint(point1Old.x,parseInt(point1Old.y)+1)
        addCarre(newPoint,point2Old,id);
        UpdateObj(newPoint,point2Old,id,type)
        document.getElementById(id).style.height=parseInt(document.getElementById(id).style.height)+1;
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
    var obj= new objectArea(id,type,point);
    this.objTab.push(obj);
}

//Creation tableau lorsque obj créer
function CreateTable(obj) 
{
    var table = document.getElementById("dataTable");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    

    cell1.innerHTML = obj.idArea;
    cell2.innerHTML = obj.typeAire;

    if (obj.typeAire=="carre") 
    {
        cell3.innerHTML = 'X: '+obj.ensemblePoint[0].x.toString()+' | Y: '+obj.ensemblePoint[0].y.toString();
        cell4.innerHTML = 'X: '+obj.ensemblePoint[1].x.toString()+' | Y: '+obj.ensemblePoint[1].y.toString();
    }
    else if (obj.typeAire=="cercle")
    {
        cell3.innerHTML = 'X: '+obj.ensemblePoint[0].toString();
        cell4.innerHTML = 'Y: '+obj.ensemblePoint[1].toString();
    }

    cell5.innerHTML='<button onclick="Up('+obj.idArea+');"> <i class="fas fa-arrow-up"> </i> </button><button onclick="Right('+obj.idArea+');"> <i class="fas fa-arrow-right"> </i> </button><button onclick="Left('+obj.idArea+');"> <i class="fas fa-arrow-left"> </i> </button><button onclick="Down('+obj.idArea+');"> <i class="fas fa-arrow-down"> </i> </button>';
    cell7.innerHTML='<a onclick="removeTable('+table.rows.length+','+obj.idArea+')" style="color:red;cursor:pointer;"><i class="fas fa-trash"></i></a>';
    cell6.innerHTML='<a onclick="ActiverKey('+obj.idArea+')" style="color:green;cursor:pointer;"><i class="fas fa-arrows-alt"></i></a>';
    
}
function removeTable(params,objId) 
{
    params--;
    var table=document.getElementById("dataTable");
    
    if (params+1==table.rows.length) 
    {
        RemoveById(objId);
        table.deleteRow(params);
    }

    else 
    {
        window.alert("Pour suprimer: Veuillez sélectionner la dernière ligne");
    }
}

function ActiverKey(id) 
{
 idArrowUse=id;   
}


/********************* KEY EVENT *********************/
document.addEventListener('keyup', (e) => 
{
    if (objTab.length!=0) 
    {   
        if (idArrowUse!=null) 
        {
            try 
            {
                switch (e.key) 
                {
                    case 'ArrowUp':
                        Up(idArrowUse);
                    break;
    
                    case 'ArrowRight':
                        Right(idArrowUse);
                    break;
                    case 'ArrowLeft':
                        Left(idArrowUse);
                    break;
    
                    case 'ArrowDown':
                        Down(idArrowUse);
                    break;
                } 
            } 
            catch (error) 
            {
                window.alert("Cliquer sur la petite fleche verte pour sélectionner une ligne a déplacé avec les flèches directionnelles");
            }
        } 
        else 
        {
            window.alert("Cliquer sur la petite fleche verte pour sélectionner une ligne a déplacé avec les flèches directionnelles");
        }
        
    }
    else 
    {
        window.alert("Veuillez créer un carré/cercle pour utiliser les flèches directionnelles");
    }
  });

  // document.getElementById(id+"_area").addEventListener("mouseover", mouseOver);

// function mouseOver() {
//   document.getElementById(id+"_area").style.border="solid purple";;
// }

