import { Controller, Get } from "@nestjs/common";

// indica que essa classe vai lidar com requisições de rota
// localhost:3000/app/get
// localhost:3000/app/bye
@Controller('/app')
export class AppController {
  @Get('/get')
  getRootRoute() {
    return 'hi there';
  }

  @Get('/bye')
  getByeThere() {
    return 'by there';
  }
}