import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import ReportCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as reportValidator from '../report/middleware';
import * as util from './util';
import FreetCollection from '../freet/collection';


const router = express.Router();



/**
 * Create a new report.
 *
 * @name POST /api/reports
 *
 * @param {string} content - The content of the report
 * @return {ReportResponse} - The created report
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the report content is empty or a stream of empty spaces
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
      reportValidator.isValidReportContent,
    ],
    async (req: Request, res: Response) => {
      console.log(req.params);
      console.log(req.body);
      const freet = await FreetCollection.findOne(req.body.id);
      if (freet === null){
        console.log("here!")
      }
      const reporterId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      const report = await ReportCollection.reportOne(reporterId, req.body.content, freet._id);
  
      res.status(201).json({
        message: 'Your report was created successfully.',
        report: util.constructReportResponse(report)
      });
    }
  );


export {router as reportRouter};