import { Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Plan from './Plan'
class App extends Component {
  state = {
    items : [],
    text :""
    }
    componentDidMount(){
      var retrievedObject = localStorage.getItem('memoriesdata');
      const items= JSON.parse([retrievedObject]);
      this.setState({items:items,text:""})
     
    }
  handleChange = e =>{
    this.setState({text: e.target.value});
  }
  handleAdd = e=>{
     if(this.text!==""){
        const items=[...this.state.items,this.state.text];
        this.setState({items:items,text:""})
       localStorage.setItem( 'memoriesdata', JSON.stringify( items ) );
        
      }
    }
  handleDelete= id =>{
      const olditems=[...this.state.items]
      const items=olditems.filter((element,i)=>{
        return i!==id
      })
      this.setState({items:items});
      localStorage.setItem( 'memoriesdata', JSON.stringify( items ) );
  }

  render(){
  return (
    <div className="container-fluid my-5">
      <div className='row'>
        <div className='col-sm-6 mx-auto'>
        <h2 className='text-center text-white mx-auto shadow-lg p-3'>Today's plan</h2>
        <div className="row">
          <div className="col-9">
            <input type="text" className='form-control' placeholder='write name here'
             value={this.state.text} onChange={this.handleChange}/>
          </div>
          <div className="col-2">
            <button className="btn btn-warning px-5 font-weight-bold"
            onClick={this.handleAdd}>Add</button>
          </div>
          <div className="container-fluid">
            <ul className="list-unstyle row m-5">
              {    this.state.items.map((value,i) =>{
                     return <Plan key={i} id={i} value={value} sendData={this.handleDelete}/>
                  })
              }
            </ul>
          </div>
         </div>
        </div>
      </div>
           
    </div>
  );
}}
export default App;
