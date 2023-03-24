<template>
  <div class="container">
    <div class="row">
        
        <div class="col-4">
                    <h2>Ingrese el empleado</h2>
                    <form @submit.prevent="submit">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-6">
                                    <input type="text" name="" class="form-control" id="nombre" placeholder="Nombre..." v-model="frmEmployee.nombre">
                                </div>
                                <div class="col-6">
                                    <input type="text" name="" class="form-control" id="apellidos" placeholder="Apellidos..." v-model="frmEmployee.apellidos">
                                </div>
                            </div>
                            
                        </div>
                        <br>
                        <div class="form-group">
                            <input type="number" name="" class="form-control" id="sueldo" placeholder="Sueldo..." v-model="frmEmployee.sueldo">
                        </div>
                        <input type="hidden" name="" v-model="employeeId.value">

                        <br>
                        <div class="row">
                            <button class="btn btn-success" type="submit" id="" v-if="frmEmployee.id == 0">Registrar</button>
                            <button class="btn btn-success" type="submit" id="" v-else>Actualizar</button>

                        </div>

                    </form>
        </div>
        <div class="col-8">
            <h2>Listado de Usuarios</h2>
            <div class="row d-flex justify-content-between">
                <div class="col-9">
                    <button class="btn btn-success" @click="clearFrm">Agregar empleado</button>
                </div>
                <div class="col-3 d-flex">
                    <input type="text" name="" placeholder="Buscar empleado..." id="" class="form-control">
                    <button class="btn btn-warning">Buscar</button>
                </div>
            </div>
            <div class="alert alert-success" v-if="mensaje">{{mensaje}}</div>
            <table class="table" v-if="empleados.length > 0">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombres</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Sueldo</th>
                    <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="{nombre, apellidos, sueldo, id} in empleados" :key="id">
                        <th scope="row">1</th>
                        <td>{{nombre}}</td>
                        <td>{{apellidos}}</td>
                        <td>{{sueldo}}</td>
                        <td>
                            <button class="btn btn-warning" @click="llenarFrm(id)">Editar</button>
                            <button class="btn btn-danger" @click="deleteEmp(id)">Eliminar</button>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
  </div>

</template>

<script>
import useEmployees from '@/composables/useEmployee'
import { reactive, ref } from 'vue'
export default {
    name: 'Employees',
    setup() {
        let employeeId = ref(0)
        const frmEmployee = reactive({
            nombre: '',
            apellidos: '',
            sueldo: '',
            id: 0
        })
        const { empleados, mensaje, addEmployee, getEmployee, updateEmployee, deleteEmployee, employee } = useEmployees();
        const submit = async() => {
            console.log({...frmEmployee})
            if(frmEmployee.id == 0) {
                if(frmEmployee.nombre != "" && frmEmployee.apellidos != "" && frmEmployee.sueldo != "") await addEmployee({...frmEmployee});
                clearFrm();

            }else {
                // TODO: editar empleado
                if(frmEmployee.nombre != "" && frmEmployee.apellidos != "" && frmEmployee.sueldo != "") await updateEmployee({...frmEmployee});
                clearFrm();
            }
            
        }

        const deleteEmp = async(id) => {
            if(id != 0) await deleteEmployee(id)
        }
        
        const clearFrm = () => {
            frmEmployee.id=0
            frmEmployee.nombre=""
            frmEmployee.apellidos=""
            frmEmployee.sueldo=""
            setTimeout(() => {
                mensaje.value = "";
            }, 5000)
        }
        const llenarFrm = async(id) => {
            
            await getEmployee(id)
            frmEmployee.id = id;

            frmEmployee.nombre = employee.value[0].nombre;
            frmEmployee.apellidos = employee.value[0].apellidos;
            frmEmployee.sueldo = employee.value[0].sueldo;
        }
        return { empleados, mensaje, frmEmployee, submit, llenarFrm, deleteEmp, employeeId: employeeId.value, clearFrm }

    }
}
</script>

<style>

</style>