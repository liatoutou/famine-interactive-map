import React from "react";
import { Button, Space } from 'antd';

type Props = {
    count: number;
    setCount: (count: number) => void;
  };

export const ExampleComponent = ({ count, setCount }: Props) => {
    return <div>Hello, world!<Button type="primary" onClick={() => setCount(count + 1)}>Cool button</Button>{count}</div>
}


export default ExampleComponent;
