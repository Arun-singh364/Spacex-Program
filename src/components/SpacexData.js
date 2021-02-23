import React, { Component } from 'react'
import axios from "axios";
import "./SpaceData.css";
import {Dropdown} from "react-bootstrap";


class SpacexData extends Component {

constructor(props) {
    super(props)

    this.state = {
         Spacexdata:[],
         title:"Sort By",
         yearTitle:"Sort By Year",
         year:""
    }
    this.handleLaunchSuccess= this.handleLaunchSuccess.bind(this) 
    this.handleLandSuccess= this.handleLandSuccess.bind(this) 
    this.handleSearch= this.handleSearch.bind(this) 
    
   
}
componentDidMount(){
    axios.get("https://api.spacexdata.com/v3/launches?limit=100")
    .then(response=>{
        this.setState({
            Spacexdata:response.data
        })
    })
    .catch(error=>{
        console.log(error);
    });
    this.setState({year:""})
}
handleLaunchSuccess(){
    this.setState({title:'Sort By Launch Success'});
    axios.get("https://api.spacexdata.com/v3/launches?limit=100&launch_success=true")
    .then(response=>{
        this.setState({
            Spacexdata:response.data
        })
    })
    .catch(error=>{
        console.log(error);
    });
    this.setState({year:""})
}

handleLandSuccess(){
    this.setState({title:'Sort By Land Success'});
    axios.get("https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true")
    .then(response=>{
        this.setState({
            Spacexdata:response.data
        })
    })
    .catch(error=>{
        console.log(error);
    });
    }


handleChange(e){

this.setState({year:e.target.value});

}

handleSearch(){
    axios.get("https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year="+this.state.year)
    .then(response=>{
        this.setState({
            Spacexdata:response.data
        })
    })
    .catch(error=>{
        console.log(error);
    });
    
}

    render() {
        const {Spacexdata,title,yearTitle,year}=this.state
         return (
            <div>
                 <h1 id ="title"><b><i>SpaceX Program</i></b></h1>
                 <hr/>
                 <div class="input-group">
                
   <input type="text" placeholder="Search By Year" value={year} name="search" onChange={(e)=>this.handleChange(e)}/>
  <button type="button" class="btn btn-outline-primary" onClick={this.handleSearch}>search</button>


    <Dropdown>
  <Dropdown.Toggle variant="primary" id="dropdown-basic">
    {title}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={this.handleLaunchSuccess}>Launch Success</Dropdown.Item>
    <Dropdown.Item onClick={this.handleLandSuccess}>Land and Launch Success </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
 
 </div>
       { <table id="Spacexdata">
                  <tr>
                     <th>Flight Number</th>
                     <th>Mission Name</th>
                     <th>Launch Year</th>
                     <th>Launch Date</th>
                    
                  </tr>
                     
                  {Spacexdata.length?Spacexdata.map(data=>
                    <tr key={data.id}>
                    <td>{data.flight_number}</td> 
                    <td>{data.mission_name}</td>
                    <td>{data.launch_year}</td> 
                    <td>{data.launch_date_local}</td> 
                                
                  </tr>
                       ):null}
              </table> }

            
          </div>
        )
    }
}

export default SpacexData;