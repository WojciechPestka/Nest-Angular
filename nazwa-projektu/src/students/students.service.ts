import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService implements OnModuleInit {
  private students: Student[] = [];
  private maxId = 0;

  create(createStudentDto: CreateStudentDto): Student {
    const newStudent: Student = {
      id: ++this.maxId,
      ...createStudentDto,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  findAll(): Student[] {
    return this.students;
  }

  findOne(id: number): Student {
    const index = this.findIndexIfExists(id);
    return this.students[index];
  }

  update(id: number, updateStudentDto: UpdateStudentDto): Student {
    const index = this.findIndexIfExists(id);
    const updatedStudent = { ...this.students[index], ...updateStudentDto };
    this.students[index] = updatedStudent;
    return updatedStudent;
  }

  remove(id: number): void {
    const index = this.findIndexIfExists(id);
    this.students.splice(index, 1);
  }

  replace(id: number, newStudent: Student): Student {
    const index = this.findIndexIfExists(id);
    newStudent.id = id; 
    this.students[index] = newStudent;
    return newStudent;
  }

  private findIndexIfExists(id: number): number {
    const index = this.students.findIndex(student => student.id === id);
    if (index === -1) {
      throw new NotFoundException('nie ma takiego studenta');
    }
    return index;
  }

  onModuleInit() {
    this.students.push({ id: ++this.maxId, index: 1, firstName: "Łukasz", lastName: "Kąśliwy" });
    this.students.push({ id: ++this.maxId, index: 2, firstName: "Marek", lastName: "Nowak" });
    this.students.push({ id: ++this.maxId, index: 3, firstName: "Zenon", lastName: "Zawada" });
  }
}
