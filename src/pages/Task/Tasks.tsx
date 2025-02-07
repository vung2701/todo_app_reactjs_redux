import { Link, useNavigate } from 'react-router-dom';
import Tables from '../../components/table/Tables';
import Tiles from '../../components/title/Tiles';
import styles from './tasks.module.css';
import { useEffect, useState } from 'react';
import { getTasks } from '../../services/apiTask';
import Buttons from '../../components/button/Buttons';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { formatDate } from '../../utils/format';
import { TaskStatus } from '../../types/DataSelect';

export default function Tasks() {
  const [tasks, setTasks] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 5;
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const fetchTasks = async () => {
    const response = await getTasks({
      perPage,
      page
    });
    setTasks(response.items);
    setTotal(response.totalItems);
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

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
      name: 'Start',
      selector: (row) => {
        return formatDate(row.startDate);
      }
    },
    {
      name: 'End',
      selector: (row) => {
        return formatDate(row.endDate);
      }
    },
    {
      name: 'Status',
      selector: (row) => {
        return TaskStatus.find((status) => status.value === row.status)?.label;
      }
    },
    {
      name: 'Action',
      width: '80px',
      cell: (row) => {
        return (
          <div className="table-icon-box">
            <Link to={`/task/update/${row?._id}`} className="table-icon edit-icon">
              <EditOutlined />
            </Link>
            <button className="table-icon delete-icon" onClick={() => {}}>
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
      <div className="table-function">
        <Buttons
          texts="Create"
          icon={<PlusOutlined style={{ color: 'white' }} />}
          status="success"
          classNames={styles.createBtn}
          handleClick={() => {
            navigate('/task/create');
          }}
        />
      </div>
      <Tables
        columns={columns}
        datas={tasks}
        currentPage={page}
        setCurrentPage={handlePageChange}
        perPage={perPage}
        total={total}
        // onSort={handleSort}
      />
    </div>
  );
}
