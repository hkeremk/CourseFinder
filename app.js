class Course{
    constructor(title,instructor,image){
        this.courseID = Math.floor(Math.random()*10000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

class UI {
    addCourseToList(course) {
        const list = document.getElementById("course-list");
        
        
            var html = `
            <tr>
                <td><img src="img/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" data-courseid="${course.courseID}"
                class="btn btn-danger btn-sm delete">Delete</a></td>
            </tr>
        
        `;

        list.innerHTML += html;
    }

    clearControls(){
       
        const title = document.getElementById("title").value="";
        const instructor = document.getElementById("instructor").value="";
        const image = document.getElementById("image").value="";

    }
    deleteCourse(element){
        if (element.classList.contains("delete")){
            element.parentElement.parentElement.remove();
            return true;
        }
    }
    showAlert(message,className){
        var alert = `
        <div class="alert alert-${className}">
        ${message}
        <div></div>
     `;

     const row = document.querySelector(".row");
     
     row.insertAdjacentHTML("beforeBegin",alert);

    setTimeout(() => {
        document.querySelector(".alert").remove();
    },3000);
    }
}

class Storage {

        static getCourses(){
            let courses;

            if(localStorage.getItem("courses")===null){
                courses=[];
            }else{
                courses = JSON.parse(localStorage.getItem("courses"));
            }
                return courses;
        }

        static displayCourses(){
            const courses = Storage.getCourses();

            courses.forEach(course => {
                const ui = new UI();
                ui.addCourseToList(course);
            });
        }
        static addCourse(course){
            const courses = Storage.getCourses();
            courses.push(course);
            localStorage.setItem("courses",JSON.stringify(courses));
        }

        static deleteCourse(element){
            if(element.classList.contains("delete")){
                const id = element.getAttribute("data-courseid");
                
                const courses = Storage.getCourses();

                courses.forEach((course,index)=>{

                    if(course.courseID == id){
                        courses.splice(index,1);
                    }
                });

                localStorage.setItem("courses",JSON.stringify(courses));
            }
        }
}

    document.addEventListener("DOMContentLoaded",Storage.displayCourses);



    document.getElementById("new-course").addEventListener("submit",
    function(event){

        const title = document.getElementById("title").value;
        const instructor = document.getElementById("instructor").value;
        const image = document.getElementById("image").value;

       
        const course = new Course(title,instructor,image);

        const ui = new UI();


        if(title==="" || instructor==="" || image===""){
            ui.showAlert("Please complete the form","warning");
        }else{
           
            ui.addCourseToList(course);

           
            Storage.addCourse(course);
            
            
            ui.clearControls();

            ui.showAlert("The course has been added","success");

        }
        
        ui.clearControls();

        event.preventDefault();
    }
);
document.getElementById("course-list").addEventListener("click",function(event){
    const ui = new UI();
   
    
    if(ui.deleteCourse(event.target)==true){
         
        
        Storage.deleteCourse(event.target);
    
        ui.showAlert("The course has been deleted","danger");  
    
    } 

});
