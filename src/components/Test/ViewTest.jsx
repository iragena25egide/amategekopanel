import React from "react";
import { List, Card, Typography, Empty } from "antd";
import PropTypes from "prop-types";

const { Text } = Typography;

const ViewTest = ({ test = {} }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">
        Modules for: {test?.title || "Untitled Test"}
      </h2>

      {test?.modules && test.modules.length > 0 ? (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={test.modules}
          renderItem={(module, index) => (
            <List.Item>
              <Card title={`Module ${index + 1}: ${module?.title || "Untitled Module"}`}>
                <Text strong>Description:</Text>
                <p>{module?.description || "No description provided."}</p>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No Modules available" />
      )}
    </div>
  );
};

// Prop validation
ViewTest.propTypes = {
  test: PropTypes.shape({
    title: PropTypes.string,
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }),
};

export default ViewTest;
