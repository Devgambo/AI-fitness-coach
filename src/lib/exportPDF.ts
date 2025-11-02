import { FitnessPlan, UserDetails } from "@/types";
import jsPDF from "jspdf";

export async function exportToPDF(plan: FitnessPlan, userDetails: UserDetails) {
  const doc = new jsPDF();
  let yPos = 20;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;

  const checkPageBreak = (additionalSpace: number = 10) => {
    if (yPos + additionalSpace > pageHeight - margin) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Title
  doc.setFontSize(24);
  doc.setTextColor(30, 64, 175); // Blue
  doc.text("AI Fitness Coach", margin, yPos);
  yPos += 15;

  // User Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Plan for: ${userDetails.name}`, margin, yPos);
  yPos += lineHeight;
  doc.text(
    `Age: ${userDetails.age} | Height: ${userDetails.height}cm | Weight: ${userDetails.weight}kg`,
    margin,
    yPos
  );
  yPos += lineHeight;
  doc.text(
    `Goal: ${userDetails.fitnessGoal} | Level: ${userDetails.fitnessLevel}`,
    margin,
    yPos
  );
  yPos += lineHeight * 2;

  // Motivation
  checkPageBreak(20);
  doc.setFontSize(14);
  doc.setTextColor(139, 92, 246); // Purple
  doc.text("Your Motivation", margin, yPos);
  yPos += lineHeight;
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const motivationLines = doc.splitTextToSize(
    `"${plan.motivation}"`,
    doc.internal.pageSize.width - margin * 2
  );
  doc.text(motivationLines, margin, yPos);
  yPos += motivationLines.length * lineHeight + 10;

  // Workout Plan
  checkPageBreak(30);
  doc.setFontSize(18);
  doc.setTextColor(30, 64, 175);
  doc.text("Workout Plan", margin, yPos);
  yPos += lineHeight * 2;

  plan.workoutPlan.weeklyPlan.forEach((day, index) => {
    checkPageBreak(40);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`${day.day} - ${day.focus}`, margin, yPos);
    yPos += lineHeight + 2;

    day.exercises.forEach((exercise) => {
      checkPageBreak(20);

      doc.setFontSize(11);
      doc.text(`• ${exercise.name}`, margin + 5, yPos);
      yPos += lineHeight;
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(
        `  Sets: ${exercise.sets} | Reps: ${exercise.reps} | Rest: ${exercise.restTime}`,
        margin + 10,
        yPos
      );
      yPos += lineHeight;

      if (exercise.notes) {
        const notesLines = doc.splitTextToSize(
          `  Note: ${exercise.notes}`,
          doc.internal.pageSize.width - margin * 2 - 10
        );
        doc.text(notesLines, margin + 10, yPos);
        yPos += notesLines.length * lineHeight;
      }
    });

    yPos += 5;
  });

  // Workout Tips
  checkPageBreak(30);
  doc.setFontSize(12);
  doc.setTextColor(30, 64, 175);
  doc.text("Workout Tips:", margin, yPos);
  yPos += lineHeight + 2;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  plan.workoutPlan.tips.forEach((tip) => {
    checkPageBreak(15);
    const tipLines = doc.splitTextToSize(
      `• ${tip}`,
      doc.internal.pageSize.width - margin * 2
    );
    doc.text(tipLines, margin, yPos);
    yPos += tipLines.length * lineHeight + 2;
  });

  yPos += 10;

  // Diet Plan
  doc.addPage();
  yPos = 20;
  doc.setFontSize(18);
  doc.setTextColor(30, 64, 175);
  doc.text("Diet Plan", margin, yPos);
  yPos += lineHeight * 2;

  plan.dietPlan.weeklyPlan.forEach((day) => {
    checkPageBreak(60);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(day.day, margin, yPos);
    yPos += lineHeight + 2;

    // Breakfast
    doc.setFontSize(11);
    doc.setTextColor(30, 64, 175);
    doc.text("Breakfast:", margin + 5, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`${day.breakfast.name}`, margin + 10, yPos);
    yPos += lineHeight;

    // Lunch
    checkPageBreak(15);
    doc.setFontSize(11);
    doc.setTextColor(30, 64, 175);
    doc.text("Lunch:", margin + 5, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`${day.lunch.name}`, margin + 10, yPos);
    yPos += lineHeight;

    // Dinner
    checkPageBreak(15);
    doc.setFontSize(11);
    doc.setTextColor(30, 64, 175);
    doc.text("Dinner:", margin + 5, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`${day.dinner.name}`, margin + 10, yPos);
    yPos += lineHeight + 5;
  });

  // Diet Tips
  checkPageBreak(30);
  doc.setFontSize(12);
  doc.setTextColor(30, 64, 175);
  doc.text("Diet Tips:", margin, yPos);
  yPos += lineHeight + 2;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  plan.dietPlan.tips.forEach((tip) => {
    checkPageBreak(15);
    const tipLines = doc.splitTextToSize(
      `• ${tip}`,
      doc.internal.pageSize.width - margin * 2
    );
    doc.text(tipLines, margin, yPos);
    yPos += tipLines.length * lineHeight + 2;
  });

  // Lifestyle Tips
  checkPageBreak(30);
  yPos += 5;
  doc.setFontSize(12);
  doc.setTextColor(30, 64, 175);
  doc.text("Lifestyle Tips:", margin, yPos);
  yPos += lineHeight + 2;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  plan.lifestyleTips.forEach((tip) => {
    checkPageBreak(15);
    const tipLines = doc.splitTextToSize(
      `• ${tip}`,
      doc.internal.pageSize.width - margin * 2
    );
    doc.text(tipLines, margin, yPos);
    yPos += tipLines.length * lineHeight + 2;
  });

  // Save the PDF
  doc.save(`${userDetails.name}_Fitness_Plan.pdf`);
}
