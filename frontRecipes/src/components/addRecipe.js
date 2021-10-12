import React, { Component } from "react";
import { create } from "../services/recipeService";

export default class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.OnChangeTitle = this.onChangeTitle.bind(this);
        this.OnChangeDescription = this.onChangeDescription.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.newRecipe = this.newRecipe.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        }
    }
    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
      }
    
      saveRecipe() {
        var data = {
            title: this.state.title,
            description: this.state.description
        };
        create(data)
        .then(response => {
            console.log(response.data);
            this.setState({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            published: response.data.published,

            submitted: true
            });
        })
        .catch(e => {
            console.log(e);
        });
    }
    newRecipe() {
        this.setState({
          id: null,
          title: "",
          description: "",
          published: false,
    
          submitted: false
        });
    }
    render(){
        return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newTutorial}>
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      required
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      name="title"
                    />
                  </div>
      
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      required
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      name="description"
                    />
                  </div>
      
                  <button onClick={this.saveTutorial} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
        );
    }

}