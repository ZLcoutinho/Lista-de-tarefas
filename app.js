const form = document.querySelector('.form-add-task')
const inputAdd = document.querySelector('.add-task')
const tasksContainer = document.querySelector('.tasks-container')
const search = document.querySelector('.search-task')

const storingData = event => {
    inputValue = inputAdd.value
    
    let tasks = new Array()

    if (localStorage.hasOwnProperty("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

   tasks.push({taskName: inputValue})

    localStorage.setItem("tasks", JSON.stringify(tasks))  
}


form.addEventListener('submit', storingData)

if (localStorage.length === 0) {

} else {
JSON.parse(localStorage.getItem("tasks")).forEach(({taskName}) => {
    // criar tags
     const ul = document.createElement('ul')
     const li = document.createElement('li')
     const checkBox = document.createElement('input')
     const image = document.createElement('img')
    
    // adicionar atributos
     ul.classList.add('tasks-wrapper')
     ul.setAttribute('data-task', taskName)
     li.classList.add('task')
     checkBox.setAttribute('type', 'checkbox')
     checkBox.classList.add('check-task')
     checkBox.setAttribute('onclick', 'checkedTask(event)')
     image.classList.add('remove-task')
     image.setAttribute('data-remove', taskName)
     image.setAttribute('onclick', 'removeTask(event)')
     image.setAttribute('src', './remove-task.png')

    // adicionar nome nas tasks
     li.textContent = taskName 

    // adionando ao container
     tasksContainer.append(ul)
     ul.append(li)
     ul.append(checkBox)
     ul.append(image)

     
})
}

const searchTask = (event) => {
    
        const tasks = Array.from(tasksContainer.children)
        const inputValue = event.target.value.toLowerCase()
    
        const taskSearchNoMatch = tasks.filter(task => !task.children[0].textContent.toLowerCase().includes(inputValue))
    
        const taskSearchMatch = tasks.filter(task => task.children[0].textContent.toLowerCase().includes(inputValue))
    
        const showOrHiddenTasks = (matchOrNoMatch, displayType) => { 
            matchOrNoMatch.forEach(task => {
            task.style.display = displayType
        })}
    
        showOrHiddenTasks(taskSearchMatch, 'flex')
        showOrHiddenTasks(taskSearchNoMatch, 'none')
    
    
}

const checkedTask = (event) => {
      const clickElement = event.target

        clickElement.parentElement.classList.toggle('task-complete')
        clickElement.previousElementSibling.classList.toggle('task-complete')
} 

const removeTask = event => {
    const clickElement = event.target

    const taskFilter = JSON.parse(localStorage.getItem("tasks")).filter(task => task.taskName !==  clickElement.dataset.remove)

    localStorage.setItem("tasks", JSON.stringify(taskFilter))
    
    clickElement.parentElement.style.display = "none"
    location.reload()
}

search.addEventListener('input', searchTask)