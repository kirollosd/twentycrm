import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { v4 } from 'uuid';
import axios, { AxiosInstance } from 'axios';

import { CompanyService } from 'src/workspace/messaging/repositories/company/company.service';
import { getCompanyNameFromDomainName } from 'src/workspace/messaging/utils/get-company-name-from-domain-name.util';
@Injectable()
export class CreateCompanyService {
  private readonly httpService: AxiosInstance;

  constructor(private readonly companyService: CompanyService) {
    this.httpService = axios.create({
      baseURL: 'https://companies.twenty.com',
    });
  }

  async createCompanies(
    domainNames: string[],
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<{
    [domainName: string]: string;
  }> {
    if (domainNames.length === 0) {
      return {};
    }

    const uniqueDomainNames = [...new Set(domainNames)];

    const existingCompanies =
      await this.companyService.getExistingCompaniesByDomainNames(
        uniqueDomainNames,
        workspaceId,
        transactionManager,
      );

    const companiesObject = existingCompanies.reduce(
      (
        acc: {
          [domainName: string]: string;
        },
        company: {
          domainName: string;
          id: string;
        },
      ) => ({
        ...acc,
        [company.domainName]: company.id,
      }),
      {},
    );

    const filteredDomainNames = uniqueDomainNames.filter(
      (domainName) =>
        !existingCompanies.some(
          (company: { domainName: string }) =>
            company.domainName === domainName,
        ),
    );

    for (const domainName of filteredDomainNames) {
      companiesObject[domainName] = await this.createCompany(
        domainName,
        workspaceId,
        transactionManager,
      );
    }

    return companiesObject;
  }

  async createCompany(
    domainName: string,
    workspaceId: string,
    transactionManager?: EntityManager,
  ): Promise<string> {
    const companyId = v4();

    const { name, city } = await this.getCompanyInfoFromDomainName(domainName);

    this.companyService.createCompany(
      workspaceId,
      {
        id: companyId,
        domainName,
        name,
        city,
      },
      transactionManager,
    );

    return companyId;
  }

  async getCompanyInfoFromDomainName(domainName: string): Promise<{
    name: string;
    city: string;
  }> {
    try {
      const response = await this.httpService.get(`/${domainName}`);

      const data = response.data;

      return {
        name: data.name ?? getCompanyNameFromDomainName(domainName),
        city: data.city,
      };
    } catch (e) {
      return {
        name: getCompanyNameFromDomainName(domainName),
        city: '',
      };
    }
  }
}
