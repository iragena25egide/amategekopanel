// ViewModules.js
import React from "react";
import { List, Card, Typography, Empty } from "antd";

const { Title, Text } = Typography;

const ViewModules = ({ course = { title: "Unknown Course", modules: [] } }) => {
  return (
    <div>
      <Title level={4}>Modules for: {course.title}</Title>
      {course.modules.length > 0 ? (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={course.modules}
          renderItem={(module, index) => (
            <List.Item>
              <Card title={`Module ${index + 1}: ${module.title}`}>
                <Text strong>Description:</Text>
                <p>{module.description}</p>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No modules available" />
      )}
    </div>
  );
};


export default ViewModules;
