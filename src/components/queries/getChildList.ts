import { VariablesGetterResult, Context } from '@enonic/nextjs-adapter';

export const getChildList = {
 query: function (path: string, context?: Context, config?: any): string {
  return `query($path:ID!, $order:String){
                 guillotine {
                   getSite {
                     displayName
                   }
                   get(key:$path) {
                     displayName
                     children(sort: $order) {
                         _path(type: siteRelative)
                         _id
                         displayName
                     }
                   }
                 }
               }`;
 },
 variables: function (
  path: string,
  context?: Context,
  config?: any
 ): VariablesGetterResult {
  return {
   path,
   order: config?.sorting,
  };
 },
};

export async function childListProcessor(
 common: any,
 context?: Context,
 config?: any
): Promise<any> {
 common.modifiedBy = 'childListProcessor';
 return common;
}
