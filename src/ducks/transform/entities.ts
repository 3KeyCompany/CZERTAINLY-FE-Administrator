import { EntityRequestDto, EntityRequestModel, EntityResponseDto, EntityResponseModel } from "types/entities";
import { transformAttributeRequestModelToDto, transformAttributeResponseDtoToModel } from "./attributes";

export function transformEntityResponseDtoToModel(entity: EntityResponseDto): EntityResponseModel {
   return {
      ...entity,
      attributes: entity.attributes.map(transformAttributeResponseDtoToModel)
   };
}

export function transformEntityRequestModelToDto(entity: EntityRequestModel): EntityRequestDto {
   return {
      ...entity,
      attributes: entity.attributes.map(transformAttributeRequestModelToDto)
   }
}