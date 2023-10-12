/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getLanguage, setLanguage } from 'redux/general/GeneralSlice';

/* Import Styles */
import styles from 'components/general/header/header.module.scss';


const Languages = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();

    /* Base variables */
    const language = useAppSelector(getLanguage);
    const languages = ['EN', 'NL'];

    return (
        <Row>
            <Col>
                <Formik
                    initialValues={{
                        language: language
                    }}
                    onSubmit={async (values) => {
                        await new Promise((resolve) => setTimeout(resolve, 500));

                        /* Change i18n language */
                        i18n.changeLanguage(values.language);

                        /* Save language choice in state */
                        dispatch(setLanguage(values.language));
                    }}
                >
                    {({ handleChange, submitForm }) => (
                        <Form>
                            <Field name="language" as="select"
                                onChange={(event: React.FormEvent<HTMLSelectElement>) => {handleChange(event); submitForm();}}
                                className={`${styles.languagesSelect} border-0`}
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