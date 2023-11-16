const { Op } = require('sequelize');
const { Users, Services, UserServices } = require('../../db');

const getAllUserServices = async (req, res) => {
  try {


    const { filters } = req.body;

    const queryOptions = {
      where: {},
      include: [
        {
          model: Users,
          attributes: ['userID', 'firstName', 'lastName','email'], 
          where: {}, // <-- Agregamos esta propiedad
        },
        {
          model: Services,
          attributes: ['serviceID', 'name', 'description', "startTime","status", "coachID"],
          where: {}, // <-- Agregamos esta propiedad
        },
      ],
      order: [],
    }

    if(filters) {

      if (filters.startDate_filter) {
        queryOptions.where.startDate = {
          [Op.eq]: filters.startDate_filter,
        };
      }

      if (filters.userID_filter) {
        queryOptions.where.userID = {
          [Op.eq]: filters.userID_filter,
        };
      }

      if (filters.serviceID_filter) {
        queryOptions.where.serviceID = {
          [Op.eq]: filters.serviceID_filter,
        };
      }

      if (filters.User_firstName_filter) {
        // Ahora establecemos la condición en la relación
        queryOptions.include[0].where.firstName = {
          [Op.eq]: filters.User_firstName_filter,
        };
      }

      if (filters.Service_name_filter) {
        // Ahora establecemos la condición en la relación
        queryOptions.include[1].where.name = {
          [Op.eq]: filters.Service_name_filter,
        };
      }

      if (filters.startDate_order) {
        queryOptions.order.push(['startDate', filters.startDate_order.toUpperCase()]);
      }

      if (filters.valuation_order) {
        queryOptions.order.push(['valuation', filters.valuation_order.toUpperCase()]);
      }

    }

    // Obtener todos los registros de UserServices con los datos asociados de Users y Services
    const result = await UserServices.findAll(queryOptions)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving UserServices records', error: error.message });
  }
}

module.exports = getAllUserServices;









// -------------------------
// const { Op } = require('sequelize');
// const { Users, Services, UserServices } = require('../../db');

// const getAllUserServices = async (req, res) => {
//   try {
//     // Obtener todos los registros de UserServices con los datos asociados de Users y Services
//     const result = await UserServices.findAll({
//       include: [
//         {
//           model: Users,
//           attributes: ['firstName', "lastName", "email"], // Agrega los campos que deseas de la tabla Users
//         },
//         {
//           model: Services,
//           attributes: ['name'], // Agrega los campos que deseas de la tabla Services
//         },
//       ],
//     });

//     // Devolver el resultado
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(500).json({ message: 'Error retrieving UserServices records', error: error.message });
//   }
// };

// module.exports = getAllUserServices;


















// const { Op } = require('sequelize');
// const { Users, Services, UserServices } = require('../../db');

// const getAllUserServices = async (req, res) => {
//     try {
//         // Obtener datos del cuerpo de la solicitud, si es necesario
//         const filters = req.body.filters || {}; // Verificar si filters está definido

//         // Configurar las opciones de consulta
//         const queryOptions = {
//             include: [
//                 {
//                     model: Users,
//                     attributes: ['userID', 'firstName', 'lastName'],
//                 },
//                 {
//                     model: Services,
//                     attributes: ['serviceID', 'name', 'category'],
//                 },
//             ],
//             order: [],
//         };

//         // Aplicar filtros si es necesario
//         if (filters.startDate_filter) {
//             queryOptions.where = {
//                 startDate: {
//                     [Op.eq]: filters.startDate_filter,
//                 },
//             };
//         }

//         // ... otros filtros ...

//         // Aplicar orden si es necesario
//         if (filters.startDate_order) {
//             queryOptions.order.push(['startDate', filters.startDate_order.toUpperCase()]);
//         }

//         // ... otros órdenes ...

//         // Realizar la consulta
//         const result = await UserServices.findAll(queryOptions);

//         return res.status(200).json(result);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error retrieving user services', error: error.message });
//     }
// };

// module.exports = getAllUserServices;






// const { Op } = require('sequelize');
// const { Users, Services, UserServices } = require('../../db'); 

// const getAllUserServices = async (req, res) => {
  
//   try {
//     const { filters } = req.body;

//     const queryOptions = {
//       where: {},
//       include: [
//         {
//           model: Users,
//           attributes: ['userID', 'firstName', 'lastName','email'], 
//         },
//         {
//           model: Services,
//           attributes: ['serviceID', 'name', 'description', "startTime","status", "coachID"],
//         },
//       ],
//       order: [],
//     };


      
//       Aca apliico los filtros
    
//       if (filters.startDate_filter) {
//         queryOptions.where.startDate = {
//           [Op.eq]: filters.startDate_filter,
//         };
//       }
  
//       if (filters.finishDate_filter) {
//         queryOptions.where.finishDate = {
//           [Op.eq]: filters.finishDate_filter,
//         };
//       }
//       if (filters.startTime_filter) {
//         queryOptions.where.startTime = {
//           [Op.eq]: filters.startTime_filter,
//         };
//       }
  
//       if (filters.valuation_filter) {
//         queryOptions.where.valuation = filters.valuation_filter;
//       }
  
      
//       Aca aplico orden
  
//       if (filters.startDate_order) {
//         queryOptions.order.push(['startDate', filters.startDate_order.toUpperCase()]);
//       }
  
//       if (filters.finishDate_order) {
//         queryOptions.order.push(['finishDate', filters.finishDate_order.toUpperCase()]);
//       }
  
//       if (filters.valuation_order) {
//         queryOptions.order.push(['valuation', filters.valuation_order.toUpperCase()]);
//       }
//       if (filters.userID_order) {
//         queryOptions.order.push(['$User.lastName$', filters.userID_order.toUpperCase()]);
//       }
  
//       if (filters.serviceID_order) {
//         queryOptions.order.push(['$Service.name$', filters.serviceID_order.toUpperCase()]);
//       }

//       const result = await UserServices.findAll(queryOptions);
//       return res.status(200).json(result);
//       return result;
//   } catch (error) {
//     return res.status(500).send({ message: "Error retrieving Service records", error: error.message });
//   }


//   } catch (error) {
//     console.error('Error al aplicar filtros:', error);
//     throw error;
//   }
// };

// module.exports = getAllUserServices




// const { UserServices } = require("../../db");
// const { Op } = require("sequelize");

// const getAllUserServices = async (req, res) => {
//   try {
//     const { filters } = req.body;
//     let allServices = await UserServices.findAll();
    
//     if (filters) {
//       // aca aplico filtros
//       if (filters.userServicesID_filter) {
//         allServices = allServices.filter(serv =>
//           serv.userServicesID.toLowerCase().includes(filters.userServicesID_filter.toLowerCase())
//         );
//       }
//       if (filters.userID_filter) {
//         allServices = allServices.filter(serv =>
//           serv.userID.toLowerCase().includes(filters.userID_filter.toLowerCase())
//         );
//       }
//       if (filters.valuation_filter) {
//         allServices = allServices.filter(serv =>
//           serv.valuation.toLowerCase().includes(filters.valuation_filter.toLowerCase())
//         );
//       }
    
//       if (filters.status_filter) {
//         allServices = allServices.filter(serv =>
//           serv.status.toLowerCase().includes(filters.status_filter.toLowerCase())
//         );
//       }
    

//     // aca aplico orden
//     if (filters.valuation_order) {
//       allServices.sort((a, b) => {
//         return filters.valuation_order === "asc"
//           ? a.valuation.localeCompare(b.valuation)
//           : b.valuation.localeCompare(a.valuation);
//       });
//     }

              
//   }
//   return res.status(200).json(allServices);
//   } catch (error) {
//     return res.status(500).send({ message: "Error retrieving Service records", error: error.message });
//   }

// };

// module.exports = getAllUserServices;

