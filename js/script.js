document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  

    
    // Add Task
    addTaskBtn.addEventListener('click', function() {
      if (taskInput.value.trim() === '') return;
      addTaskToDOM(taskInput.value.trim());
      taskInput.value = '';
      taskInput.focus();
    });
  
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTaskBtn.click();
    });
  
    // Add task to DOM
    function addTaskToDOM(taskText, isCompleted = false) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      if (isCompleted) li.classList.add('bg-light', 'text-muted');
  
      const taskContent = document.createElement('div');
      taskContent.className = 'd-flex align-items-center gap-3';
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'form-check-input me-2';
      checkbox.checked = isCompleted;
      checkbox.addEventListener('change', function() {
        li.classList.toggle('bg-light', this.checked);
        li.classList.toggle('text-muted', this.checked);
        taskTextSpan.classList.toggle('text-decoration-line-through', this.checked);
      });
  
      const taskTextSpan = document.createElement('span');
      taskTextSpan.textContent = taskText;
      taskTextSpan.className = isCompleted ? 'text-decoration-line-through' : '';
  
      // Edit button
      const editBtn = document.createElement('button');
      editBtn.className = 'btn btn-sm btn-outline-secondary me-2';
      editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
      editBtn.addEventListener('click', () => editTask(taskTextSpan));
  
      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-sm btn-outline-danger';
      deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
      deleteBtn.addEventListener('click', () => li.remove());
  
      taskContent.appendChild(checkbox);
      taskContent.appendChild(taskTextSpan);
      li.appendChild(taskContent);
      
      // Button group
      const btnGroup = document.createElement('div');
      btnGroup.className = 'd-flex';
      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(deleteBtn);
      
      li.appendChild(btnGroup);
      taskList.appendChild(li);
    }
  
    // Edit Task function
    function editTask(taskSpan) {
      const currentText = taskSpan.textContent;
      const li = taskSpan.closest('li');
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'form-control form-control-sm';
      input.value = currentText;
      
      // Replace span with input
      taskSpan.replaceWith(input);
      input.focus();
      
      // Save on Enter or blur
      const saveEdit = () => {
        if (input.value.trim() !== '') {
          taskSpan.textContent = input.value.trim();
        }
        input.replaceWith(taskSpan);
      };
      
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveEdit();
      });
      
      input.addEventListener('blur', saveEdit);
    }
  });

  // Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing to-do list code remains the same)
    
    // Initialize lightGallery
    lightGallery(document.querySelector('.gallery-grid'), {
        selector: 'a',
        download: false,
        counter: false
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.gallery-filter button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Real-Time Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Validate on input
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
            } else {
                input.classList.add('is-invalid');
            }

            // Special check for password match
            if (input === password || input === confirmPassword) {
                validatePasswordMatch();
            }
        });
    });

    // Validate on form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Registration successful!'); // Replace with actual submission logic
            form.reset();
        }
    });

    // Custom validation for password match
    function validatePasswordMatch() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match");
            confirmPassword.classList.add('is-invalid');
        } else {
            confirmPassword.setCustomValidity("");
            confirmPassword.classList.remove('is-invalid');
        }
    }

    // Validate all fields
    function validateForm() {
        let isValid = true;
        form.querySelectorAll('input').forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
                isValid = false;
            }
        });
        return isValid;
    }
// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
      tasks.push({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('input[type="checkbox"]').checked
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Load tasks on startup
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed); // Reuses your existing function
      });
    }
  }

});