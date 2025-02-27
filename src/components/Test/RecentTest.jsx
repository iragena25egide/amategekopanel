import React from "react";
import { List, Card } from "antd";

const RecentTest = ({ Test }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Recently Added Quiz</h2>
      {Test.length === 0 ? (
        <p>No recent Quiz available.</p>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={Test.slice(-5).reverse()} // Show last 5 added Test
          renderItem={(test) => (
            <List.Item>
              <Card title={test.title} bordered>
                <p>{test.description}</p>
                <p className="text-gray-500 text-sm">Added on: {Test.timestamp}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default RecentTest;
