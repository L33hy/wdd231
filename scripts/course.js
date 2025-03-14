document.addEventListener('DOMContentLoaded', function() {
    const allCoursesButton = document.querySelector('.all-courses');
    const cseCoursesButton = document.querySelector('.cse-courses');
    const wddCoursesButton = document.querySelector('.wdd-courses');
    const coursesContainer = document.querySelector('.course-2');
    const allCourses = coursesContainer.querySelectorAll('.all');
    const courseNote = document.querySelector('.course-note'); // Update selector

    function updateCourseCount() {
        let visibleCourses = 0;
        allCourses.forEach(course => {
            if (course.style.display !== 'none') {
                visibleCourses++;
            }
        });
        courseNote.textContent = `The total number of courses listed below is ${visibleCourses * 2}.`;
    }

    allCoursesButton.addEventListener('click', function() {
        allCourses.forEach(course => course.style.display = 'block');
        updateCourseCount();
    });

    cseCoursesButton.addEventListener('click', function() {
        allCourses.forEach(course => {
            if (course.textContent.startsWith('CSE')) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
        updateCourseCount();
    });

    wddCoursesButton.addEventListener('click', function() {
        allCourses.forEach(course => {
            if (course.textContent.startsWith('WDD')) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
        updateCourseCount();
    });
    updateCourseCount();

    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('nav-list');

    hamburger.addEventListener('click', function() {
        navList.classList.toggle('open');
        if (navList.classList.contains('open')) {
            hamburger.textContent = 'X';
        } else {
            hamburger.textContent = '☰';
        }
    });
});