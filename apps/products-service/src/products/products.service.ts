import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productModel.findOne({ sku: createProductDto.sku });
    if (existingProduct) {
      throw new ConflictException('Product with this SKU already exists');
    }

    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product || !product.isActive) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findBySku(sku: string): Promise<Product | null> {
    return this.productModel.findOne({ sku, isActive: true }).exec();
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category, isActive: true }).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    if (updateProductDto.sku) {
      const existingProduct = await this.productModel.findOne({ sku: updateProductDto.sku });
      if (existingProduct && existingProduct._id.toString() !== id) {
        throw new ConflictException('Product with this SKU already exists');
      }
    }

    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    ).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async updateQuantity(id: string, quantity: number): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { $inc: { quantity } },
      { new: true },
    ).exec();

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
