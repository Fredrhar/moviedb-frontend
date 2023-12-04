import React from 'react';
import { getUrl } from '@enonic/nextjs-adapter';
import { PartProps } from '@enonic/nextjs-adapter/views/BasePart';

const ChildList = (props: PartProps) => {
 const { data, meta } = props;
 const children = data.get.children;
 if (!children || children.length === 0) {
  return null;
 }
 return (
  <main
   style={{
    margin: `0 auto`,
    maxWidth: 960,
    padding: `0 1.0875rem`,
   }}
  >
   {children && (
    <ul>
     {children.map((child: any, i: number) => (
      <li key={i}>
       <a href={getUrl(child._path, meta)}>{child.displayName}</a>
      </li>
     ))}
    </ul>
   )}
  </main>
 );
};

export default ChildList;
