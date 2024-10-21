import {Table} from "antd";

export default function DynamicTables({ columns, data, onRow, loading }) {

  return (
    <>

      <Table
        columns={columns}
        dataSource={data}
        pagination={true}
        className="ant-border-space"
        onRow={onRow}   
        loading={loading}
      />
    </>
  )
}

