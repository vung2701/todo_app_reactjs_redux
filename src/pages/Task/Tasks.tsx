import { Link, useNavigate } from 'react-router-dom';
import Tables from '../../components/table/Tables';
import Tiles from '../../components/title/Tiles';
import styles from './tasks.module.css';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getTasks } from '../../services/apiTask';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const response = await getTasks();
    console.log(response);
    setTasks(response);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = [
    {
      name: 'ID',
      selector: (row) => {
        return <Link to={`/task/${row?._id}`}>{row._id}</Link>;
      }
    },
    {
      name: 'Title',
      selector: (row) => {
        return row?.title;
      }
    },
    {
      name: 'Action',
      width: '80px',
      cell: (row) => {
        return (
          <div className="table-icon-box">
            <Link to={`/task/update/${row?.id}`} className="table-icon">
              <EditOutlined />
            </Link>
            <button className="table-icon" onClick={() => {}}>
              <DeleteOutlined />
            </button>
          </div>
        );
      }
    }
  ];
  return (
    <div className={`${styles.tasks} page_container`}>
      <Tiles texts="Tasks" fontSize={23} fontWeight={700} />
      <Tables
        columns={columns}
        datas={tasks}
        // currentPage={currentPage}
        // setCurrentPage={handlePageChange}
        // perPage={perPage}
        // onSort={handleSort}
      />
    </div>
  );
}
