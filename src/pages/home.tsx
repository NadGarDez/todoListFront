import React, { useRef, useState, type JSX } from "react";
import BackgroundLayout from "../components/layout/backgroundLaout";
import MobileFirstContainer from "../components/layout/mobileFirstContainer";
import DefaultModal from "../components/ui/defaultModal";
import Slider, { type Settings } from 'react-slick';
import StandardModalContent from "../components/ui/standarModalContent";
import { CLIENT_ID, COGNITO_DOMAIN, LOGOUT_URL } from "../constants";
import HomeHeader from "../components/layout/homeHeader";
import { FloatingAddButton } from "../components/ui/floatingAddButton";
import TaskLabel from "../components/ui/taskLabel";
import TaskList from "../components/ui/TaskList";
import type { TaskInterface } from "../types";
import { TaskForm } from "../components/ui/TaskForm";


const sliderConfig: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
};



interface modalState {
    visible: boolean,
    contentName: 'signOut' | 'delete'
}



const MOCK_TASKS: TaskInterface[] = [
    {
        id: 't-001',
        title: 'Completar el Prototipo de UI',
        labels: ['Diseño', 'Alta Prioridad'],
        description: 'Finalizar la maquetación de los componentes base (Header, TaskItem, FAB) antes de la reunión de las 14:00.',
    },
    {
        id: 't-002',
        title: 'Revisión de Seguridad AWS Cognito',
        labels: ['Backend', 'Urgente'],
        description: 'Verificar las políticas de acceso de IAM y los flujos de autenticación de Cognito para asegurar la robustez.',
    },
    {
        id: 't-003',
        title: 'Implementar Componente TaskFormContent',
        labels: ['Frontend', 'Desarrollo'],
        description: 'Utilizar MUI y hooks para gestionar el estado del formulario de creación/edición de tareas.',
    },
    {
        id: 't-004',
        title: 'Responder Correos Pendientes',
        labels: ['Administrativo'],
        description: 'Responder a Juan, María y Pedro sobre el estado del proyecto y las dependencias de la API.',
    },
    {
        id: 't-005',
        title: 'Refactorizar Lógica de Labels en TaskItem',
        labels: ['Frontend', 'Refactor'],
        description: 'Asegurar que la asignación de colores en TaskLabel sea determinista basada en el nombre de la etiqueta.',
    },
    {
        id: 't-006',
        title: 'Preparar Presentación Semanal',
        labels: ['Reunión'],
        description: 'Crear diapositivas con el progreso de la semana y los planes para la próxima iteración.',
    },
    {
        id: 't-007',
        title: 'Investigar Librería de Gráficos',
        labels: ['Investigación'],
        description: 'Evaluar tres opciones de librerías (Recharts, Nivo, Chart.js) para el dashboard de métricas.',
    },
    {
        id: 't-008',
        title: 'Configurar Variables de Entorno de Producción',
        labels: ['DevOps', 'Backend'],
        description: 'Ajustar las variables de entorno para el despliegue final en la etapa de producción.',
    },
    {
        id: 't-009',
        title: 'Comprar Suministros de Oficina',
        labels: ['Personal', 'Baja Prioridad'],
        description: 'Necesito comprar tinta para la impresora y resmas de papel A4.',
    },
    {
        id: 't-010',
        title: 'Pruebas E2E para el Cierre de Sesión',
        labels: ['Testing', 'Seguridad'],
        description: 'Escribir scripts de Cypress para verificar que el logout de Cognito funcione correctamente en todos los navegadores.',
    },
    {
        id: 't-011',
        title: 'Documentación de Endpoints REST',
        labels: ['Documentación', 'Backend'],
        description: 'Documentar los 5 endpoints principales de la API de tareas en Swagger/OpenAPI.',
    },
    {
        id: 't-012',
        title: 'Optimización de Carga Inicial (Bundling)',
        labels: ['Rendimiento'],
        description: 'Analizar el tamaño del bundle con Webpack y aplicar Code Splitting si es necesario.',
    },
    {
        id: 't-013',
        title: 'Llamar al Cliente X por Retraso',
        labels: ['Ventas', 'Urgente'],
        description: 'Contactar al cliente para informarle sobre el pequeño retraso en la entrega del módulo de reportes.',
    },
    {
        id: 't-014',
        title: 'Creación de Componente TaskList',
        labels: ['Frontend', 'Completado'],
        description: 'Implementación del mapeo de tareas y renderizado de TaskItem. (Listo para integración).',
    },
    {
        id: 't-015',
        title: 'Instalar Nueva Versión de Node.js',
        labels: ['Mantenimiento'],
        description: 'Actualizar la versión local de Node.js a la 20.x y verificar que no haya conflictos de dependencias.',
    },
    {
        id: 't-016',
        title: 'Diseñar Icono para la Aplicación',
        labels: ['Diseño'],
        description: 'Crear un favicon y los iconos de la aplicación en formato PNG para iOS y Android.',
    },
    {
        id: 't-017',
        title: 'Configurar Hooks de Validación en el Formulario',
        labels: ['Frontend', 'Desarrollo'],
        description: 'Usar React Hook Form o Joyeux para validar campos requeridos (título, al menos).',
    },
    {
        id: 't-018',
        title: 'Revisión de Código del Módulo de Autenticación',
        labels: ['Revisión', 'Seguridad'],
        description: 'Realizar una revisión de código a fondo del flujo de login y tokens.',
    },
    {
        id: 't-019',
        title: 'Planificar el Sprint 2',
        labels: ['Gestión'],
        description: 'Definir objetivos, asignar puntos y priorizar las historias de usuario para el siguiente ciclo.',
    },
    {
        id: 't-020',
        title: 'Resolver Bug de Desplazamiento en iOS',
        labels: ['Bug', 'Frontend'],
        description: 'El scroll infinito se bloquea en Safari móvil al llegar al final de la lista de tareas. Investigar `overscroll-behavior`.',
    },
];

const defaultTaskData:TaskInterface = {
    id:'',
    title: '',
    labels: [],
    description: ''
}

const Home = (): JSX.Element => {

    const [activeItem, setActiveItem] = useState<TaskInterface>(defaultTaskData);

    const signOut = () => {
        window.location.href = `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}}&logout_uri=${encodeURIComponent(LOGOUT_URL)}`;

    };

    const sliderRef = useRef<Slider>(null);

    const [modalState, setModalStatus] = useState<modalState>({
        visible: false,
        contentName: 'signOut'
    })

    const toggleVisibility = () => {
        setModalStatus(
            {
                ...modalState, visible: !modalState.visible
            }
        )
    }

    const onChangeVisibility = (newVisibility: boolean) => {
        setModalStatus({ ...modalState, visible: newVisibility })
    }

    const back = () => {
        sliderRef.current?.slickPrev();
        setActiveItem(defaultTaskData)
    }

    const next = () => {
        sliderRef.current?.slickNext();
    }


    const onPressLogOut = () => {
        setModalStatus(
            {
                contentName: 'signOut',
                visible: true
            }
        )
    }

    const onPressDetail = (item:TaskInterface) => {
        setActiveItem(item);
        next()
    }

    const onPressDelete = (item:TaskInterface) => {
        setActiveItem(item); 
    }

    const onPressAdd = () => {
        setActiveItem(defaultTaskData)
        next()
    }


    const finaleDelete = () => {
        // async operation
         setActiveItem(defaultTaskData);
    }


    const createOrUpdate = (data:TaskInterface) => {
        
    }


    return (

        <BackgroundLayout >
            <MobileFirstContainer>
                <HomeHeader

                    onPressLogOut={onPressLogOut}
                />

                <Slider {...sliderConfig} ref={sliderRef}>

                    <div>
                        <TaskList
                            tasks={MOCK_TASKS}
                            onPressDelete={onPressDelete}
                            onPressDetail={onPressDetail}
                        />

                    </div>
                    <div>
                        <TaskForm 
                            task={activeItem}
                            onSubmit={createOrUpdate}
                            back={back}
                        />
                    </div>

                </Slider>

                <FloatingAddButton

                    onPressAdd={onPressAdd}
                />

                {/* modal aquí tendremos un selector de contenido dinámico*/}

                <DefaultModal
                    visible={modalState.visible}
                    relativeHeight="35%"
                    onChangeVisibility={onChangeVisibility}
                >
                    {
                        modalState.contentName === 'signOut' ? (
                            <StandardModalContent
                                title="¿Estás seguro de que quieres cerrar sesión?"
                                subtitle="Serás redirigido a la página de inicio de sesión."
                                onCancel={toggleVisibility}
                                onAction={signOut}
                                actionLabel="Cerrar Sesión"
                            />
                        ) : (
                            <StandardModalContent 
                                title={`¿Estás seguro de que quieres eliminar el elemento ${activeItem.id}?`}
                                subtitle="Los datos eliminados son irrecuperables."
                                onCancel={toggleVisibility}
                                onAction={finaleDelete}
                                actionLabel="Cerrar Sesión"
                            />
                        )
                    }
                </DefaultModal>
            </MobileFirstContainer>
        </BackgroundLayout>
    );
};

export default Home;