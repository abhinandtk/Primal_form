import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <>
    <nav class="navbar navbar-expand-lg ">
  <a class="navbar-brand text-white" href="#">Candidate form</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link text-white" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link text-white" href="/Viewform">View user</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link text-white" href="/Trial">Trial</a>
      </li>
    </ul>
    
  </div>
</nav>
    </>
  )
}
