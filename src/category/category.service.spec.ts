import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import * as sinon from 'sinon';
import { Product } from '../product/entities/product.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ImportCategoryContentDto } from './dto/create-complete-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;

  const CATEGORY_REPOSITORY_TOKEN = getRepositoryToken(Category);
  const PRODUCT_REPOSITORY_TOKEN = getRepositoryToken(Product);

  let categoryRepositoryStub: {
    save: sinon.SinonStub;
    findAndCount: sinon.SinonStub;
    findOneBy: sinon.SinonStub;
    delete: sinon.SinonStub;
  };

  let productRepositoryStub: {
    save: sinon.SinonStub;
  };

  const createCategoryDtoMock: CreateCategoryDto = {
    code: '12345678',
    name: 'Test',
  };

  const categoryCreatedMock: Category = {
    id: 1,
    code: '13245678',
    name: 'teste de categoria',
    createdAt: new Date(),
  };

  const productCreatedMock: Product = {
    id: 1,
    code: '13245678',
    name: 'teste de categoria',
    createdAt: new Date(),
    price: 20,
    categoryId: 1,
    category: {} as Category,
    detail: 'Detalhe',
  };

  const allCategoriesMock: Category[] = [categoryCreatedMock];

  const updateCategoryMock: UpdateCategoryDto = {
    ...createCategoryDtoMock,
  };
  updateCategoryMock.detail = 'Detalhes da categoria';

  const importCategoryMock: ImportCategoryContentDto = {
    code: createCategoryDtoMock.code,
    products: [],
  };

  beforeAll(async () => {
    categoryRepositoryStub = {
      save: sinon.stub(),
      findAndCount: sinon.stub(),
      findOneBy: sinon.stub(),
      delete: sinon.stub(),
    };

    productRepositoryStub = {
      save: sinon.stub(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CATEGORY_REPOSITORY_TOKEN,
          useFactory: () => categoryRepositoryStub,
        },
        {
          provide: PRODUCT_REPOSITORY_TOKEN,
          useFactory: () => productRepositoryStub,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  beforeEach(async () => {
    categoryRepositoryStub.save = sinon.stub().callsFake(() => {
      return categoryCreatedMock;
    });
    categoryRepositoryStub.findAndCount = sinon.stub().callsFake(() => {
      return [allCategoriesMock, allCategoriesMock.length];
    });
    categoryRepositoryStub.findOneBy = sinon.stub().callsFake(() => {
      return categoryCreatedMock;
    });
    service.productExists = sinon.stub().callsFake(() => {
      return false;
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fail validating createCategoryDto', () => {
    const model = new CreateCategoryDto();
    model.code = '123456789';
    model.name = '';
    return validate(model).then((errors) => {
      expect(errors.length).toBe(2);
      expect(errors[0].constraints.maxLength).toBe(
        'O código da categoria pode ter no máximo 8 caracteres',
      );
      expect(errors[1].constraints.isNotEmpty).toBe(
        'O nome da categoria não pode ser nulo',
      );
    });
  });

  it('should create a new category', async () => {
    validate(createCategoryDtoMock).then((errors) => {
      expect(errors.length).toBe(0);
    });
    const category = await service.create(createCategoryDtoMock);
    expect(categoryRepositoryStub.save.calledOnce).toBe(true);
    expect(category).toBeDefined();
  });

  it('should find all categories', async () => {
    const categories = await service.findAll();
    expect(categoryRepositoryStub.findAndCount.calledOnce).toBe(true);
    expect(categories).toBeDefined();
    expect(categories.data.length).toBe(1);
  });

  it('should find category by id', async () => {
    const category = await service.findOne(categoryCreatedMock.id);
    expect(categoryRepositoryStub.findOneBy.calledOnce).toBe(true);
    expect(category).toBeDefined();
  });

  it('should update category', async () => {
    const category = await service.update(
      categoryCreatedMock.id,
      updateCategoryMock,
    );
    expect(categoryRepositoryStub.save.calledOnce).toBe(true);
    expect(category).toBeDefined();
  });

  it('should import category content - new category, any products', async () => {
    categoryRepositoryStub.findOneBy = sinon.stub().callsFake(() => {
      return null;
    });
    await service.importCategoryContent(importCategoryMock);
    expect(categoryRepositoryStub.findOneBy.calledOnce).toBe(true);
    expect(categoryRepositoryStub.save.calledOnce).toBe(true);
  });

  it('should remove product', async () => {
    await service.remove(categoryCreatedMock.id);
    expect(categoryRepositoryStub.delete.calledOnce).toBe(true);
  });

  it('should import category content - existent category, import products', async () => {
    productRepositoryStub.save = sinon.stub().callsFake(() => {
      return productCreatedMock;
    });
    importCategoryMock.products.push({
      code: 'PTESTE',
      name: 'Produto',
      price: 20,
      detail: 'Detalhes do produto',
    });
    await service.importCategoryContent(importCategoryMock);
    expect(categoryRepositoryStub.findOneBy.calledOnce).toBe(true);
  });
});
