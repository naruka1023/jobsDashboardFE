# Job Dashboard Project

  This project as the title says, is called the Job Dashboard Project. Its a service that enable the HR department from any company to reject or accept a massive amount of applicants at once. One can also choose to edit or add new job postings. I use redux to manage the state of the app and keeping all data of the app in one place, so there would be no need for broadcasting or emitting data around, creating a giant mess in the process. The use of redux have also enabled the app to save all changes, which without it, wouldn't be possible. Saving changes is simply a giant POST request that interact with my API to update the database according to the user's changes. Any information regarding the API that I developed can be found in https://github.com/naruka1023/jobsDashboardBE. <br>
  The purpose of this project is to show recruiters of my proficiency in developing a Web App by using HTML5, CSS, Javascript, sql, Laravel, and Angular. I used Angular for the frontend(this repository), and Laravel for the backend. I could've easily used Vue.js since Vue is more compatible with Laravel. But the reason I used Angular is because to show that I'm just as capable of learning new framework and applying it to a professional setting. <br>
  This project is far from finished. I only developed the functionalities for the HR users side. I have yet to develop a Job Posting page (reminiscient to Indeed.com, stackoverflow.com and other job market sites we know and love) that would let future job candidates apply for a job, a notification system that would notify a company everytime a person apply for a job, and a login system for the job dashboard. I'm also planning to implement a new functionality within the job dashboard app that would enable HR to filter our job candidates based on gender, age group, experience, etc. <br>
  But perhaps that is for another day. The purpose of this project is to showcase my capabilities in designing, developing, testing, and deploying a web application anyways. And I think I pretty much accomplish that. 
  
  
UML Sequence Diagram: <br><br>
![alt text](https://github.com/naruka1023/jobsDashboardFE/blob/master/sequenceDiagram.png)

<br><br>
App starts here: https://jobdashboardbe.herokuapp.com/
