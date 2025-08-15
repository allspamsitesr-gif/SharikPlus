import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, IsDecimal, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductVariantDto {
  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  attrs: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDecimal()
  priceOverride?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  stock?: number;
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsDecimal()
  price: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDecimal()
  weight?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dimensions?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants?: ProductVariantDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assets?: string[];
}

export class UpdateProductDto extends CreateProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
