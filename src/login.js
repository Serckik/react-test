import { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
    constructor(props){
        super(props)
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.changeUserData = this.changeUserData.bind(this)
        this.clearFormData()
    }

    clearFormData() {
        this.formData = {
            login: '',
            password: ''
        }
    }

    handleLoginChange(evt){
        this.formData.login = evt.target.value
    }

    handlePasswordChange(evt){
        this.formData.password = evt.target.value
    }

    changeUserData(newUserData){
        localStorage.setItem('access', JSON.stringify(newUserData.access));
        localStorage.setItem('refresh', JSON.stringify(newUserData.refresh));
        this.props.onChangeUserData(newUserData)
        console.log(this.props.UserData)
    }

    async handleFormSubmit(evt){
        evt.preventDefault()
            axios.post('http://26.245.229.110:8000/api/v1/token/', {
                username: this.formData.login,
                password: this.formData.password
              })
              .then((response) => {
                this.changeUserData(response.data)
              })
              .catch(function (error) {
                console.log(error);
              });
    }

    render() {
        if(localStorage.getItem('access') !== 'null')
            return <Navigate to="/" replace></Navigate>
        else
            return (
                <section>
                    <h1>Вход</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="field">
                            <label className="label">Логин</label>
                            <div className="control">
                                <input type="text" className="input" onChange={this.handleLoginChange}></input>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Пароль</label>
                            <div className="control">
                                <input type="password" className="input" onChange={this.handlePasswordChange}></input>
                            </div>
                        </div>
                        <div className="field is-grouped is-grouped-right">
                            <div className="control">
                                <input type="reset" className="button is-link is-light" value="Сброс"></input>
                            </div>
                            <div className="control">
                                <input type="submit" className="button is-primary" value="Войти"></input>
                            </div>
                        </div>
                    </form>
                </section>
            )
    }
}