import React from 'react'
import Notes from './Notes';

const Home = () => {
  return (
    <div>
      <div className="container">
        <h1 className='my-4'> Add Your Note</h1>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <Notes />
    </div>
  )
}

export default Home
