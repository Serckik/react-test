import { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default class CreateNewBlog extends Component {
    constructor(props){
        super(props)
        this.state = {redirect: false}
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.clearFormData()

    }

    clearFormData() {
        this.formData = {
            title: '',
            description: ''
        }
    }

    handleTitleChange(evt){
        this.formData.title = evt.target.value
    }

    handleDescriptionChange(evt){
        this.formData.description = evt.target.value
    }

    async handleFormSubmit(evt){
        evt.preventDefault()
        console.log(localStorage.getItem('access'))
        let data = {
            authors: [],
            title: this.formData.title,
            description: this.formData.description,
            category: 2
        }
        await this.props.Refresh('blog/api/v1/blog/', data)
        this.setState((state) => ({redirect: true}))
    }

    render() {
        if (this.state.redirect)
            return <Navigate to="/"></Navigate>
        else
        return (
            <section>
                <h1>Создать новый блог</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="field">
                        <label className="label">Название</label>
                        <div className="control">
                            <input type="text" className="input" onChange={this.handleTitleChange}></input>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Описание</label>
                        <div className="control">
                            <input type="text" className="input" onChange={this.handleDescriptionChange}></input>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input type="reset" className="button is-link is-light" value="Сброс"></input>
                        </div>
                        <div className="control">
                            <input type="submit" className="button is-primary" value="Создать"></input>
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}