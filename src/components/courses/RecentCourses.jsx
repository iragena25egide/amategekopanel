import React from "react";
import { List, Card } from "antd";

const RecentCourses = ({ courses }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Recently Added Courses</h2>
      {courses.length === 0 ? (
        <p>No recent courses available.</p>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={courses.slice(-5).reverse()} // Show last 5 added courses
          renderItem={(course) => (
            <List.Item>
              <Card title={course.title} bordered>
                <p>{course.description}</p>
                <p className="text-gray-500 text-sm">Added on: {course.timestamp}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default RecentCourses;
