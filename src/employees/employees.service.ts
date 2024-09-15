import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v3 as uuidv4} from "uuid";

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[]=[{
    id: uuid(),
    name: "val",
    lastName: "venegas",
    phoneNumber: "xx67676"
  },
{
  id: uuid(),
  name: "dul",
  lastName: "venegas",
  phoneNumber: "xx43434"
}]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee)=> employee.id === id);
    if(!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id);
    employeeToUpdate = {
      ...employeeToUpdate,
      ...updateEmployeeDto
      
    }
  
    this.employees = this.employees.map((employee) =>{
      if (employee.id === id){
       employeeToUpdate
      }
      return employee;
    })
    return employeeToUpdate;
  }

  remove(id: string) {
    this.employees=  this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}



function uuid(): string {
  throw new Error('Function not implemented.');
}

