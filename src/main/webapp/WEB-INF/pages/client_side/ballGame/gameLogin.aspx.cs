using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
public partial class gameLogin : System.Web.UI.Page
{

    string gameId ="1";
    string userId ="1234";
    string time = "0";
    string[] pictures = new string[] {"pic1","pic2", "pic3"};
    string empty = "";
    string jsonString = "";
    
    
    protected void Page_Init(object sender, EventArgs e)
    {

    }

    protected void Page_Load(object sender, EventArgs e)
    {
        sendJSON();     
    }

    
   public void sendJSON()
   {
//        gameId = Request.QueryString["id"];

       jsonString =

      "{'gameID':'" + gameId + "','userID':'" + userId + "', 'time':'" + time + "','userPics':[{'picName':'" + pictures[0] +
       "'},{'picName':'" + pictures[1] +
       "'},{'picName':'" + pictures[2] +
       "'}],'data':{'levels':[" +
       "{'ballsPerLevel':'" + empty + "','errorsPerLevel':'" + empty + "' }," +
       "{'ballsPerLevel':'" + empty + "','errorsPerLevel':'" + empty + "' }," +
       "{'ballsPerLevel':'" + empty + " ','errorsPerLevel':'" + empty + "' }]}}";
      
        Response.Write(jsonString);
        
   }

}