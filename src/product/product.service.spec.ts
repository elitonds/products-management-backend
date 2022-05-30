import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import * as sinon from 'sinon';
import { Category } from '../category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  const PRODUCT_REPOSITORY_TOKEN = getRepositoryToken(Product);

  let productRepositoryStub: {
    save: sinon.SinonStub;
    findAndCount: sinon.SinonStub;
    findOneBy: sinon.SinonStub;
    delete: sinon.SinonStub;
  };

  const createProductDtoMock: CreateProductDto = {
    code: '12345678',
    name: 'Test',
    categoryId: 1,
    detail: 'Detalhe produto',
    price: 25,
  };

  const productCreatedMock: Product = {
    id: 1,
    code: '13245678',
    name: 'teste de categoria',
    createdAt: new Date(),
    category: {} as Category,
    categoryId: 1,
    detail: 'Detalhe do produto',
    price: 20,
  };

  const allProductsMock: Product[] = [productCreatedMock];

  const updateCategoryMock: UpdateProductDto = {
    ...productCreatedMock,
  };

  beforeAll(async () => {
    productRepositoryStub = {
      save: sinon.stub(),
      findAndCount: sinon.stub(),
      findOneBy: sinon.stub(),
      delete: sinon.stub(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PRODUCT_REPOSITORY_TOKEN,
          useFactory: () => productRepositoryStub,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  beforeEach(async () => {
    productRepositoryStub.save = sinon.stub().callsFake(() => {
      return productCreatedMock;
    });
    productRepositoryStub.findAndCount = sinon.stub().callsFake(() => {
      return [allProductsMock, allProductsMock.length];
    });
    productRepositoryStub.findOneBy = sinon.stub().callsFake(() => {
      return productCreatedMock;
    });
    service.exportProductsByCategory = sinon.stub().callsFake(() => {
      return false;
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new product', async () => {
    validate(createProductDtoMock).then((errors) => {
      expect(errors.length).toBe(0);
    });
    const category = await service.create(createProductDtoMock);
    expect(productRepositoryStub.save.calledOnce).toBe(true);
    expect(category).toBeDefined();
  });

  it('should find all products', async () => {
    const categories = await service.findAll();
    expect(productRepositoryStub.findAndCount.calledOnce).toBe(true);
    expect(categories).toBeDefined();
    expect(categories.dataSource.length).toBe(1);
  });

  it('should find product by id', async () => {
    const category = await service.findOne(productCreatedMock.id);
    expect(productRepositoryStub.findOneBy.calledOnce).toBe(true);
    expect(category).toBeDefined();
  });

  it('should update product', async () => {
    const category = await service.update(
      productCreatedMock.id,
      updateCategoryMock,
    );
    expect(productRepositoryStub.save.calledOnce).toBe(true);
    expect(category).toBeDefined();
  });

  it('should remove product', async () => {
    await service.remove(productCreatedMock.id);
    expect(productRepositoryStub.delete.calledOnce).toBe(true);
  });
});
