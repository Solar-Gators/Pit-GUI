import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateTelemItem from "./components/CreateTelemItem";
interface Car {
  name: string;
  id: number;
}

export default class Cars extends React.Component<{}, { cars: Car[] }> {
  state = {
    cars: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        cars: [
          {
            name: "Cielo",
            id: 1,
          },
          {
            name: "Car 2",
            id: 2,
          },
        ],
      });
    }, 200);
  }

  render() {
    let { cars } = this.state;

    let carRows: Car[][] = [];
    let rowIndex = -1;
    for (let index = 0; index < cars.length; index++) {
      if (index % 6 === 0) {
        rowIndex++;
        carRows[rowIndex] = [];
      }

      carRows[rowIndex].push(cars[index]);
    }

    return (
      <React.Fragment>
        <img alt="logo" src={logo} width="160px" height="100px" />
        <Button as={Link} to="/car/add" variant="success float-right mt-4 mr-3">
          Add Car
        </Button>
        <CreateTelemItem />
        <div className="mx-4">
          {carRows.map((carRow) => {
            return (
              <Row>
                {carRow.map((car) => {
                  return (
                    <Col sm={2}>
                      <Card className="mt-3">
                        <Card.Body>
                          <Card.Title>
                            <Button
                              className="float-left d-block position-absolute"
                              variant="warning"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="edit" size="sm" />
                            </Button>
                          </Card.Title>
                          <Card.Text className="text-center">
                            <Link to={`/${car.name}/car`}>
                              <h1>{car.name}</h1>
                              <Button className="w-100">Select</Button>
                            </Link>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
