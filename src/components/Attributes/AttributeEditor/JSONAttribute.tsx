import { AttributeDescriptorModel } from "models/attributes/AttributeDescriptorModel";
import { AttributeModel } from "models/attributes/AttributeModel";

interface Props {
   descriptor: AttributeDescriptorModel,
   attribute: AttributeModel
}

export function JSONAttribute({
   descriptor,
   attribute
}: Props): JSX.Element {

   console.log(descriptor, attribute);

   return (

      <>
      jsonAttribute
      </>

   )

}