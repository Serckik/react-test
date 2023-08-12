import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import axios from 'axios';
import Login from './login';
import Data from './data';
import CreateNewBlog from './createNewBlog';

function App() {
  const [posts, setPosts] = useState([]);
  const [UserData, setUserData] = useState([]);

  console.log(localStorage.getItem('access'))

  useEffect(() => {
    renderBlogs()
 }, []);

  function renderBlogs(){
    axios
    .get('http://26.245.229.110:8000/blog/api/v1/blog/', {
     params:{
       page_size: 100
     }
    })
    .then((response) => {
     setPosts([...response.data.results]);
    })
    .catch((err) => {
       console.log(err);
    });
  };

  function Refresh(URL, data){
    axios.post('http://26.245.229.110:8000/api/v1/token/verify/', {
        token: JSON.parse(localStorage.getItem('access'))
    })
    .then((response) => {
      let a = localStorage.getItem('access')
      axios.post('http://26.245.229.110:8000/' + URL, data,
        {
          headers:{
            Authorization: "JWT " + JSON.parse(a)
          }
        })
        .then((response) => {
          renderBlogs()
        })
        .catch(function (error) {
            console.log(error);
        });
    })
    .catch(function (error) {
      console.log(JSON.parse(localStorage.getItem('refresh')))
      axios.post('http://26.245.229.110:8000/api/v1/token/refresh/', {
        refresh: JSON.parse(localStorage.getItem('refresh'))
      })
      .then((response) => {
        localStorage.setItem('access', JSON.stringify(response.data.access))
        Refresh(URL, data)
      })
      .catch(function (error) {
        localStorage.setItem('access', null)
        localStorage.setItem('refresh', null)
        setUserData([...localStorage.getItem('access')])
      });
    });
  }


  return (
    <div className="App">
      <HashRouter>
        <nav className="navbar is-light">
          <div>
            <div className="navbar-start">
                    {localStorage.getItem('access') !== null && (
                      <NavLink to="/createNewBlog">
                        Создать новый блог
                      </NavLink>
                      )
                    }
            </div>
          </div>
        </nav>
        <main className="context px-6 mt-6">
          <Routes>
            <Route path="/" element={
                <Data data={posts}/>
            }></Route>
            <Route path="/login" element={
              <Login UserData={UserData} onChangeUserData={setUserData}></Login>
            }></Route>
            <Route path="/createNewBlog" element={
              <CreateNewBlog Refresh={Refresh}></CreateNewBlog>
            }></Route>
          </Routes>
        </main>
      </HashRouter>
    </div>
  );
}

export default App;
