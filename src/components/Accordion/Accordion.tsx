import { Accordion } from "radix-ui";
import "./styles.css";

type Props = {
    triggerContent: string
}

const AccordionDemo = ({triggerContent}: Props) => {
    return (
        <Accordion.Root type="multiple">
            <Accordion.Item value="item-1">
                <Accordion.Header>
                    <Accordion.Trigger>
                        {triggerContent}
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content />
            </Accordion.Item>
        </Accordion.Root>
    )
};

export default AccordionDemo;