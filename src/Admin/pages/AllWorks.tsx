import { Container, Image } from "react-bootstrap";
import { MoonLoader } from "react-spinners";
import useGetCollection from "../../hooks/useGetCollection";
import { Work } from "../../interfaces/works.interfaces";
import { worksCol } from "../../services/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Timestamp, deleteDoc, doc } from "firebase/firestore";

const AllWorks = () => {
  const { data: workData, isLoading } = useGetCollection<Work>(worksCol);
  const [work, setWork] = useState<Work[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setWork(workData || []);
  }, [workData]);

  const handleRowClick = (workId: string | undefined) => {
    navigate(`/admin/all-works/${workId}`);
  };

  useEffect(() => {
    if (workData) {
      const sortedProjects = [...workData].sort((a, b) => {
        const aDate = a.created?.toDate().getTime();
        const bDate = b.created?.toDate().getTime();

        if (aDate && bDate) {
          return bDate - aDate;
        }
        return 0;
      });

      setWork(sortedProjects);
    }
  }, [workData]);

  const handleDeleteWork = async (workId: string | undefined) => {
    if (window.confirm("Är du säker på att du vill radera denna produkt?")) {
      try {
        await deleteDoc(doc(worksCol, workId));
        const updatedProjects = work.filter(
          (project) => project._id !== workId
        );
        setWork(updatedProjects);
        alert("Produkten har raderats.");
      } catch (error) {
        alert("Ett fel uppstod när produkten skulle raderas.");
      }
    }
  };

  return (
    <div className="admin-allWorks-page">
      <Container>
        {isLoading && (
          <div className="loading-spinner">
            <MoonLoader color="#6c8c97" />
          </div>
        )}
        <div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Skapad</th>
                <th style={{ textAlign: "center" }}>Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {work?.map((project) => {
                let dateString = "";
                if (project.created && project.created instanceof Timestamp) {
                  const createdDate = project.created.toDate();
                  dateString = createdDate.toLocaleDateString("sv-SE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                }

                return (
                  <tr
                    key={project._id}
                    onClick={() => handleRowClick(project._id)}
                  >
                    <td>
                      {project.images.length > 0 && (
                        <Image
                          key={project.images[0]._id}
                          src={project.images[0].src}
                          style={{ width: "50px", height: "50px" }}
                        />
                      )}
                    </td>
                    <td>{project.title}</td>
                    <td>{dateString}</td>
                    <td className="delete-work" style={{ textAlign: "center" }}>
                      <Image
                        onClick={() => handleDeleteWork(project._id)}
                        src="/images/delete-icon.png"
                        style={{ cursor: "pointer", width: "20px" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default AllWorks;
