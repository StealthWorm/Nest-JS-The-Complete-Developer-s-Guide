import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
// import { AuthService } from 'src/users/auth.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';
import { User } from '../../src/users/users.entity';
// import { GetEstimateDto } from './dtos/get-estimate.dto';

describe('ReportsController', () => {
  let controller: ReportsController;
  let fakeReportsService: Partial<ReportsService>;
  // let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    const reports: Report[] = [];

    fakeReportsService = {
      create: (reportDto: CreateReportDto, user: User) => {
        const report = {
          id: Math.floor(Math.random() * 999999),
          price: reportDto.price,
          year: reportDto.year,
          lng: reportDto.lng,
          lat: reportDto.lat,
          make: reportDto.make,
          model: reportDto.model,
          mileage: reportDto.mileage,
          approved: false,
          user,
        } as Report;

        reports.push(report);

        return Promise.resolve(report);
      },
      changeApproval: (id: string, approved: boolean) => {
        return Promise.resolve({
          id: parseInt(id),
          approved,
          price: 65000,
          make: 'Toyota',
          model: 'etios',
          year: 2022,
          lng: 45,
          lat: 45,
          mileage: 50000,
        } as Report);
      },

      // createEstimate: ({
      //   make,
      //   model,
      //   lng,
      //   lat,
      //   year,
      //   mileage,
      // }: GetEstimateDto) => {
      //   return Promise.resolve({
      //     price: 65000,
      //   });
      // },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: fakeReportsService,
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create a report', async () => {
    const user = {
      id: 1,
      email: 'asdf@asdf.com',
      password: 'password',
    } as User;

    const report = {
      // id: 1,
      make: 'Toyota',
      model: 'etios',
      year: 2022,
      mileage: 50000,
      price: 65000,
      lng: 45,
      lat: 45,
    } as Report;

    const session = { currentUser: user }; //mock da sessão

    const reports = await controller.createReport(report, user);

    expect(reports.user.id).toEqual(1);
    expect(session.currentUser.email).toEqual('asdf@asdf.com');
  });
});
