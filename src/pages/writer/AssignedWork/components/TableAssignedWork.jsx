import React, { useEffect, useState } from "react";
import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableHeader,
  TableHead,
  // TableHeadCell,
} from "keep-react";
import TableRowAssignedWork from "./TableRowAssignedWork";
import UnavailableDark from "../../../../assets/UnavailableDark.png";
import UnavailableLight from "../../../../assets/UnavailableLight.png";
import { useStateShareContext } from "../../../../Context/StateContext";
import { toast } from "react-toastify";
import instance from "../../../../axios/instance";
import { useProgressBarContext } from "../../../../Context/ProgressBarContext";
import Loader from "../../../../SharedComponents/Loader";

const TableAssignedWork = () => {
  const { darkMode } = useStateShareContext();
  const [loading, setLoading] = useState(false);
  const { assignedWork, setAssignedWork } = useProgressBarContext();

  const fetchAssignedWork = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/work/assigned/");
      setAssignedWork(response.data);
    } catch (error) {
      if (error.response && error.response.status) {
        const status = error.response.status;
        const message = error.response.data;

        switch (status) {
          case 500:
            toast.error(`Internal server error`);
            break;
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedWork();
  }, []);
  return (
    <>
      <Table showCheckbox={false} hoverable="true" className="">
        <TableCaption>
          <div className="my-5 flex items-center justify-between px-6">
            <div className="flex items-center gap-5">
              <p className="text-[16px] lg:text-xl font-semibold text-metal-600 dark:text-white">
                Assigned work
              </p>
              <Badge
                size="sm"
                color="secondary"
                className="dark:text-black text-[12px] md:text-sm"
              >
                {assignedWork.length} items
              </Badge>
            </div>
          </div>
        </TableCaption>
        <TableHeader>
          <TableHead className="min-w-[100px]">
            <p className="text-[13px] lg:text-[15px] font-medium text-metal-400 dark:text-sidebartext-hover">
              #
            </p>
          </TableHead>
          <TableHead className="min-w-[122px] text-[13px] lg:text-[15px]">
            Type
          </TableHead>
          <TableHead className="min-w-[82px] text-[13px] lg:text-[15px]">
            Words
          </TableHead>
          <TableHead className="min-w-[200px] text-[13px] lg:text-[15px]">
            Deadline
          </TableHead>
          <TableHead className="min-w-[140px] text-[13px] lg:text-[15px]">
            Timer
          </TableHead>
          <TableHead className="min-w-[150px] text-[13px] lg:text-[15px]">
            Status
          </TableHead>
          <TableHead className="min-w-[100px] text-[13px] lg:text-[15px]" />
        </TableHeader>
        <TableBody
          className={`divide-gray-25 divide-y ${loading ? "hidden" : ""}`}
        >
          {assignedWork &&
            assignedWork.map((work, index) => {
              return (
                <TableRowAssignedWork
                  key={index}
                  id={work.id}
                  work_code={work.work_code}
                  type={work.type}
                  words={work.words}
                  deadline={work.deadline}
                  status={work.status}
                  read={work.assigned_is_read}
                  isSubmitted={work.is_submitted}
                />
              );
            })}
        </TableBody>
      </Table>
      <Loader loading={loading} />
      <div
        className={`pb-[8rem] ${
          assignedWork.length !== 0 || loading ? "hidden  " : ""
        }`}
      >
        <img
          className="mx-auto h-[10rem] lg:h-auto lg:w-[16rem]"
          src={darkMode ? UnavailableDark : UnavailableLight}
          alt=""
        />
        <p className="font-bold text-[17px] md:text-xl text-center">
          No assigned work yet!
        </p>
        <p className="font-medium text-[13px] lg:text-[14px] text-center mt-2">
          Any assigned work will appear here.
        </p>
      </div>
    </>
  );
};

export default TableAssignedWork;
