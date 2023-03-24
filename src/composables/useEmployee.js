import axios from 'axios'
import { ref } from 'vue';
const useEmployee = () => {
    const mensaje = ref('')
    const arrEmployees = ref([])
    const employee = ref({})
    const url = ref('http://localhost:3000/api/pruebas/')
    
    const getEmployees = async() => {
        let employees = await axios.get(url.value);
        if(employees.data.rows.length > 0) {
            arrEmployees.value = employees.data.rows;
        }else {
            console.log("No hay empleados")
        }
        
    }

    const getEmployee = async(id) => {
        let oneEmployee = await axios.get(url.value + id);
        console.log(oneEmployee.data)
        if(oneEmployee.data.rows.length > 0) {
            employee.value = oneEmployee.data.rows;
        }else {
            console.log("No existe el empleado")
        }
    }

    const addEmployee = async(data) => {
        console.log(data)
        let empleadoPost = await axios.post(url.value + 'addEmployee', data);
        if(empleadoPost.status == 200) {
            mensaje.value = "Empleado agregado"
            getEmployees();
        }
    }

    const updateEmployee = async(data) => {
        let empleadoPut = await axios.put(url.value + 'editEmployee/' + data.id, data);
        if(empleadoPut.status == 200) {
            mensaje.value = "Empleado actualizado"
            getEmployees();
        }
    } 

    const deleteEmployee = async(id) => {
        let empleadoDelete = await axios.delete(url.value + 'deleteEmployee/' + id);
        if(empleadoDelete.status == 200) {
            mensaje.value = "Empleado eliminado"
            getEmployees();
        }
    }
    
    getEmployees();
    
    const cleanMessage = () => {
        mensaje.value = "";
    }
    /* switch(accion) {
        case 'getAll':
            getEmployees();
            break;
        case 'getOne':
            break;
        case 'addOne':
            addEmployee(data);
            break;
        case 'editOne':
            break;
        case 'deleteOne':
            break;
        default:
            mensaje.value = 'No se completo la solicitud correctamente';
    } */

    return {
        empleados: arrEmployees,
        mensaje,
        getEmployees,
        getEmployee,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        cleanMessage,
        employee
    }

}

export default useEmployee;