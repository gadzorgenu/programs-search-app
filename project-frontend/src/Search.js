import React, {Component} from 'react';
import './Search.css'

class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            programs: []
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }
    componentDidMount() {
    fetch("http://localhost:3001/programs")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            programs: result.data
          });
        },
      )
    }

    updateInput(event) {
        this.setState({
            search: event.target.value
        });
    }

    handleSearch() {
        fetch("http://localhost:3001/programs/" + this.state.search)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            programs: result.data
          });
        },
      )
    }

    render(){
        return(
    
    <div className="cont">
        <div className="search-container">
        <h1 className="search-prog">Welcome to the training programs search app</h1>
        <div className="search-cont">
         <input onChange={this.updateInput} id="search" name="search" type="text" placeholder="Search to view our training programs "/>
        <button onClick={this.handleSearch}  className="search-btn">Search</button>
        </div>
        </div>
         
         <div className="container">
         <div className="row">
          {this.state.programs.map(program => (
            <div className="col-4">
                <div className="box">
                    <div className="image">
                      { program.img_src === ""  
                        ? <img className="ig" src="/images/IoT.jfif" alt="Default"/>
                        : <img className="ig" src={'/images/' + program.img_src} alt="Default"/>
                      }
                    </div>
                    <h2>{ program.name }</h2>
                    <h6>Dev Stack {program.development_stack}</h6>
                    <h3 className="duration">{program.duration}   <span className="price">{'Price ' + program.pricing}</span></h3>  
                    <div className="rating">
                        <img className="rate" src="/images/5-star.jfif" alt="Default" />
                    </div>
                </div>
            </div>
            
          ))}

        </div>
        </div>
    </div>
        );
    }
}

export default Search;