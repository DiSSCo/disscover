/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from 'formik';


const Languages = () => {
    /* Hooks */
    const { i18n } = useTranslation();

    /* Base variables */
    const languages = ['EN', 'NL'];

    return (
        <Row>
            <Col>
                <Formik
                    initialValues={{
                        language: ''
                    }}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 500));

                        i18n.changeLanguage(values.language);
                    }}
                >
                    {({ handleChange, submitForm }) => (
                        <Form>
                            <Field name="language" as="select"
                                onChange={(event: React.FormEvent<HTMLSelectElement>) => {handleChange(event); submitForm();}}
                                className="header_languagesSelect py-1"
                            >
                                {languages.map((language) => {
                                    return (
                                        <option key={language} value={language}>
                                            {language}
                                        </option>
                                    );
                                })}
                            </Field>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row>
    );
}

export default Languages;